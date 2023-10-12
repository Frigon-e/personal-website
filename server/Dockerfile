FROM golang:latest

WORKDIR /app
COPY go.mod/ ./
COPY ./server/*.go /app/main/
COPY ./server/certificationChecker.py /app/main

RUN go mod download
RUN go mod tidy
RUN go build -o builtexe ./main

EXPOSE 9090

CMD ["./builtexe"]
