# Low-Level Design (LLD)

## 1. Backend Modules

### 1.1 App Bootstrap

- src/server.ts: starts Express listener on env.PORT
- src/app.ts: middleware chain and /api/v1 route mounting

Middleware order:

1. requestLogger
2. express.json
3. apiV1Router
4. notFound
5. errorHandler

### 1.2 Environment Loading

- src/config/loadEnv.ts: attempts multiple .env locations to support monorepo root env files
- src/config/env.ts: resolves NODE_ENV, PORT, LOG_LEVEL
- src/config/prisma.ts: loads env then creates PrismaClient

### 1.3 Users Feature

Routes:

- GET /api/v1/users
- GET /api/v1/users/:id
- POST /api/v1/users

Controller behavior:

- getUsers: returns all users
- getUserById: validates numeric id, returns 400 for invalid id
- createUser: validates name/email, returns 400 on missing fields

Service behavior:

- getUserById throws AppError(404) when no user found

Repository behavior:

- findAll uses prisma.user.findMany(order by id asc)
- findById uses prisma.user.findUnique
- create uses prisma.user.create
- deleteAll helper for tests

## 2. Data Model

Defined in prisma/schema.prisma.

User table mapping:

- id Int PK auto increment
- email unique
- name string
- createdAt default now
- updatedAt updatedAt trigger

Mapped SQL table name: users

## 3. Error Handling

- src/utils/appError.ts provides statusCode-aware errors.
- src/middlewares/errorHandler.ts maps unknown errors to 500 with message Internal server error.
- Validation and not-found paths use explicit 4xx status codes.

## 4. Frontend Integration Details

- src/api/users.ts provides typed request wrappers.
- Generic request<T> throws Error on success=false responses.
- App.tsx uses useEffect for initial GET /users and a controlled form for POST /users.

## 5. Vite Proxy

Configured in apps/frontend/vite.config.ts:

- /api -> http://localhost:4000

This avoids browser CORS errors during local dev.

## 6. Tests

### 6.1 src/tests/app.test.ts

- Health endpoint
- Users list endpoint
- Create validation
- Create success

### 6.2 src/tests/users.integration.test.ts

DB-backed integration checks:

- empty list
- seeded list
- validation failures
- successful create persisted to DB
- duplicate email constraint path (500)
- invalid id (400)
- unknown id (404)
- fetch by id success

## 7. Operational Commands

From repo root:

- docker-compose up -d
- npm run dev --workspace=api
- npm run dev --workspace=frontend
- npm run test --workspace=api
