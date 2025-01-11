FROM golang:alpine3.21

VOLUME [ "/output" ]

COPY . /go-src

WORKDIR /go-src
RUN /usr/local/go/bin/go build -o /output/main