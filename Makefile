.PHONY: install lint test build up down logs restart

install:
	npm ci

lint:
	npm run lint

test:
	npm test

build:
	env $(shell cat .env) docker-compose --env-file .env build

up:
	env $(shell cat .env) docker-compose --env-file .env up -d --build

down:
	env $(shell cat .env) docker-compose --env-file .env down

down-volume:
	docker-compose down -v


logs:
	env $(shell cat .env) docker-compose logs -f

restart:
	make down && make up


apply-migration:
	@echo "Apply migration"
	npx prisma migrate deploy



token:
	node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"

create-migration:
	npx prisma migrate dev --create-only