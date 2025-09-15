.PHONY: help build up down logs clean dev-up dev-down prod-up prod-down

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build all Docker images
	docker-compose build

dev-up: ## Start development environment
	docker-compose -f docker-compose.dev.yml up -d

dev-down: ## Stop development environment
	docker-compose -f docker-compose.dev.yml down

dev-logs: ## Show development logs
	docker-compose -f docker-compose.dev.yml logs -f

prod-up: ## Start production environment
	docker-compose up -d

prod-down: ## Stop production environment
	docker-compose down

prod-logs: ## Show production logs
	docker-compose logs -f

clean: ## Clean up Docker resources
	docker-compose down -v
	docker-compose -f docker-compose.dev.yml down -v
	docker system prune -f

restart: ## Restart all services
	docker-compose restart

status: ## Show service status
	docker-compose ps

shell-frontend: ## Access frontend container shell
	docker-compose exec frontend sh

shell-api: ## Access API container shell
	docker-compose exec api sh

shell-db: ## Access database shell
	docker-compose exec postgres psql -U postgres -d thai_university

backup-db: ## Backup database
	docker-compose exec postgres pg_dump -U postgres thai_university > backup_$(shell date +%Y%m%d_%H%M%S).sql

restore-db: ## Restore database (usage: make restore-db FILE=backup.sql)
	docker-compose exec -T postgres psql -U postgres thai_university < $(FILE)
