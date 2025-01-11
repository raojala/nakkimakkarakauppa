FROM golang:alpine3.16

VOLUME [ "/output" ]

COPY . /go-src

WORKDIR /go-src
ENTRYPOINT ["/usr/local/go/bin/go", "build", "-o", "/output/main", "main"]