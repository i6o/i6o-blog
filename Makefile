.PHONY: help build run start stop remove

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

build: ## Build docker image.
	docker build . -t mikaheim/i6o-blog:latest

run: run-redis run-app # Run application and start Redis.

run-app: ## Run application container.
	docker run -p 3000:3000 -d -v $(shell pwd)/.env.local.sample:/app/.env.production --name i6o-blog mikaheim/i6o-blog:latest

run-redis: ## Run Redis container needed by the applcation.
	docker run -p 6379:6379 -d --name redis redis

start: start-redis start-app ## Start application and Redis containers.

start-app: ## Start a stopped application container.
	docker start i6o-blog

start-redis: ## Start Redis container needed by the applcation.
	docker start redis

stop: stop-app stop-redis ## Stop application and Redis containers.

stop-app: ## Stop a running application container.
	docker stop i6o-blog

stop-redis: ## Stop Redis container.
	docker stop redis

remove: remove-app remove-redis ## Remove application and Redis containers.

remove-app: stop ## Remove application container.
	docker rm i6o-blog

remove-redis: ## Remove Redis container.
	docker rm redis

push:  ## Push application container to Docker registry.
	docker push mikaheim/i6o-blog:latest

compose-up: ## Start the application stack with Docker compose.
	docker-compose up -d

compose-down: ## Stop the application stack with Docker compose.
	docker-compose down -v
