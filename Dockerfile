FROM golang:1.23-alpine3.21

WORKDIR /usr/src/app

EXPOSE 80

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY . ./
RUN go mod download && go mod verify

RUN apk add chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY . .
RUN go build -v -o /usr/local/bin/app ./...

CMD ["app"]
