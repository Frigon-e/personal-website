FROM golang:latest

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files to the container
COPY go.mod ./

# Copy the entire project directory into the container
COPY . .

RUN go mod download
RUN go mod tidy


ENV GIN_MODE=release

RUN go build -o builtexe ./golang/

EXPOSE 9090

CMD ["./builtexe"]
