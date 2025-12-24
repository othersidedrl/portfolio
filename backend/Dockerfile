# Build# Stage 1: Build
FROM golang:1.24-alpine AS builder

WORKDIR /app

# Copy the go mod files from the backend directory
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# Copy the rest of the backend source code
COPY backend/ .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./cmd/api/main.go

# Run stage
FROM alpine:latest

WORKDIR /app

# Copy binary from builder
COPY --from=builder /app/main .
# Copy .env file (if you want to include it, though usually mounted via volume or env_file)
# COPY .env .

# Port the backend runs on
EXPOSE 5555

CMD ["./main"]
