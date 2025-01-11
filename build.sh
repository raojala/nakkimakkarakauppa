#!/bin/sh

_SYMLINK=$(readlink -f "$0")
WORK_DIR=$(dirname "$_SYMLINK")
BUILD_OUTPUT_PATH=$WORK_DIR/output
BINARY_PATH=$BUILD_OUTPUT_PATH/main

IMAGE_NAME=website
IMAGE_VERSION=1
CONTAINER_NAME=website_container
BUILD_CONTAINER_IMAGE=build_container
BUILD_CONTAINER_NAME=build_website
PORT=10001

echo "working directory: " + $WORK_DIR

# install docker if it is not yet installed (run script again after, docker install interrupts it)
testDocker=$(which docker)
if [ ${#testDocker} -lt 1 ] 
then
    echo "Docker missing... installing in rootless mode..."
    dockerSh=$(curl https://get.docker.com/rootless)
    eval "$dockerSh"

    # add environment variables to bashrc to work
    echo "export PATH=~/bin:$PATH" >> ~/.bashrc
    echo "export DOCKER_HOST=unix:///run/user/1000/docker.sock" >> ~/.bashrc
    echo "docker installed in rootless mode. re-login or reload .bashrc to finish setting up"
    return
fi

# check if output directory exists
if [ -d "$BUILD_OUTPUT_PATH" ]; then
    echo "output folder exists... remaking"
    rm -r "$BUILD_OUTPUT_PATH"
    mkdir "$BUILD_OUTPUT_PATH"
else
    echo "output folder does not exist... creating..."
    mkdir "$BUILD_OUTPUT_PATH"
fi

echo "Starting build server from path: " + $WORK_DIR/setup/docker-build/Dockerfile
docker build -f "$WORK_DIR/setup/docker-build/Dockerfile" -t $BUILD_CONTAINER_IMAGE .
docker run --name $BUILD_CONTAINER_NAME -v "$WORK_DIR/output":/output -d $BUILD_CONTAINER_IMAGE

echo "Waiting for build server to finish (max 300 seconds)"
iterator=0
until [ -f "$BINARY_PATH" ]
do
    echo -n "."
    if [ $iterator -gt 300 ]
    then
        echo "Build server: waiting for binary failed. Timed out"
        break;
    fi
    iterator=$(($iterator+1))
    sleep 1;
done

docker build -f "$WORK_DIR/setup/docker-server/Dockerfile" -t $IMAGE_NAME:$IMAGE_VERSION .

CONTAINER_NAME=$CONTAINER_NAME-$IMAGE_VERSION
docker run --restart always --name $CONTAINER_NAME -p $PORT:80 -d $IMAGE_NAME:$IMAGE_VERSION
    
/usr/bin/echo "removing build container";
docker rm -f $BUILD_CONTAINER_IMAGE;
docker rmi -f $BUILD_CONTAINER_IMAGE;
#docker system prune -a