# Survey Observability Platform - Architecture

## 1. Overview

This repository is a monorepo for a survey observability platform with a working API and frontend integration.

Current implemented stack:

- Backend API: Express + TypeScript + Prisma
- Database: PostgreSQL (Docker)
- Cache: Redis (Docker, provisioned)
- Frontend: React + Vite + TypeScript
- Tests: Jest + Supertest (API integration and endpoint coverage)

## 2. Monorepo Structure

Root uses npm workspaces and Turbo.

- apps/api: backend service
- apps/frontend: web client
- apps/simulator: placeholder app
- packages/shared-types: placeholder package
- packages/tracing-sdk: placeholder package
- docs: architecture and design documents

## 3. Implemented Backend Architecture

The API follows a layered design:

Route -> Controller -> Service -> Repository

Implemented layers:

- routes: API versioning and endpoint mapping
- controllers: request validation and response mapping
- services: domain logic and error handling
- repositories: Prisma-backed data access
- middlewares: request logging, 404 handler, centralized error handling
- config: environment loading and Prisma bootstrap

Key backend endpoints:

- GET /api/v1/health
- GET /api/v1/users
- GET /api/v1/users/:id
- POST /api/v1/users

## 4. Data Architecture

Prisma schema is implemented in apps/api/prisma/schema.prisma.

Current data model:

- User
	- id: Int (autoincrement primary key)
	- email: String (unique)
	- name: String
	- createdAt: DateTime
	- updatedAt: DateTime

The table is mapped as users in PostgreSQL.

## 5. Environment and Config Model

Environment files are kept at monorepo root.

API config includes a monorepo-aware env loader that checks multiple candidate paths so the app works when started from either root or apps/api.

Important env values currently in use:

- PORT=4000
- DATABASE_URL=postgresql://postgres:postgres@localhost:5433/api_dev
- REDIS_URL=redis://localhost:6379

## 6. Local Infrastructure

Root docker-compose provides local data services:

- PostgreSQL 16 (container survey-postgres)
- Redis 7 (container survey-redis)

Important port mapping:

- Postgres host port is 5433 (container 5432)

Reason: avoid conflict with local PostgreSQL installed on host 5432.

## 7. Frontend Runtime Integration

Frontend uses a typed API client in apps/frontend/src/api/users.ts.

Implemented client calls:

- getUsers
- getUserById
- createUser

Vite dev proxy forwards /api/* to http://localhost:4000 to avoid CORS issues in local development.

## 8. Runtime Flow

1. Frontend loads users via GET /api/v1/users.
2. API route delegates to controller, service, and repository.
3. Repository executes Prisma query against PostgreSQL.
4. Response returns standardized payload shape.
5. Frontend create form submits POST /api/v1/users and updates local state with created record.

## 9. Validation Status

Current verified status:

- API tests passing (13 tests)
- GET /api/v1/users returns 200
- POST /api/v1/users returns 201 and persists row
- Frontend renders users and can create users

## 10. Known Gaps

- Redis is provisioned but not yet used by API logic.
- Shared packages are present but not implemented.
- Simulator app remains a placeholder.
- Telemetry dependencies exist in frontend but cross-service tracing pipeline is not fully documented yet.
