# High-Level Design (HLD)

## 1. Purpose

This document describes the high-level design of the Survey Observability Platform as currently implemented.

## 2. System Context

Primary components:

- Frontend Web App (React + Vite)
- Backend API (Express + TypeScript)
- PostgreSQL (system of record for users)
- Redis (available for future caching/events)

All components run in a monorepo with npm workspaces.

## 3. Component View

### 3.1 Frontend

Responsibilities:

- Render users page
- Fetch users from API
- Create users via form submission
- Show loading and error states

Integration:

- Calls API through typed functions in apps/frontend/src/api/users.ts
- Uses Vite proxy for /api during local development

### 3.2 API

Responsibilities:

- Expose versioned REST endpoints
- Validate request inputs
- Apply business rules and error mapping
- Persist/retrieve users via Prisma

Implementation pattern:

- Route -> Controller -> Service -> Repository

### 3.3 Data Services

PostgreSQL:

- Holds users table
- Runs in Docker on host port 5433

Redis:

- Runs in Docker on host port 6379
- Reserved for future use

## 4. API Surface

Version prefix: /api/v1

- GET /health
- GET /users
- GET /users/:id
- POST /users

Response contract:

- Success: { success: true, message, data }
- Error: { success: false, message }

## 5. Deployment/Run Topology (Local)

1. Start Docker services from repo root.
2. Start API app in apps/api.
3. Start frontend app in apps/frontend.

Data path in local dev:

- Browser -> Vite dev server -> proxy /api -> Express API -> Prisma -> Postgres

## 6. Configuration Strategy

Environment files are at monorepo root.

API uses a monorepo-aware env loader to resolve root .env regardless of current working directory when launching the service.

## 7. Quality and Validation

- API test suite validates endpoint behavior and DB integration.
- Integration tests cover users CRUD-like flow (list, get by id, create, error paths).

## 8. Non-Functional Notes

- Logging middleware records method, path, status code, and latency.
- Centralized error middleware normalizes 4xx/5xx responses.
- Current design is extensible for telemetry and real-time features.
