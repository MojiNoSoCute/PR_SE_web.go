.PHONY: build run test clean docker-build docker-run

# Build the application
build:
	go build -o bin/main .

# Run the application
run:
	go run .

# Run tests
test:
	go test -v ./...

# Clean build artifacts
clean:
	rm -rf bin/

# Install dependencies
deps:
	go mod download
	go mod tidy

# Run with hot reload (requires air)
dev:
	air

# Docker commands
docker-build:
	docker build -t thai-university-api .

docker-run:
	docker-compose up -d

docker-stop:
	docker-compose down

# Database commands
db-migrate:
	@echo "Run database migrations here"

db-seed:
	@echo "Seed database with sample data"

# Linting
lint:
	golangci-lint run

# Format code
fmt:
	go fmt ./...
