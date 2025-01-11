#!/bin/sh

docker build -t website .
docker run -itd --name website-app -p 3333:80 website