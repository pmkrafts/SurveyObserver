# Node + Express + TypeScript Learning Setup Guide

This guide explains how to build a clean backend starter architecture step by step.

---

# Step 1 — Create Project

```bash
mkdir express-ts-learning-server
cd express-ts-learning-server
npm init -y
```

---

# Step 2 — Install Dependencies

## Runtime Dependencies

```bash
npm install express dotenv
```

---

## Development Dependencies

```bash
npm install -D typescript ts-node-dev @types/node @types/express jest ts-jest supertest @types/jest @types/supertest eslint prettier
```

---

# Step 3 — Initialize TypeScript

```bash
npx tsc --init
```

Update:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

---

# Step 4 — Create Folder Structure

```txt
src/
  app.ts
  server.ts

  config/
  routes/
  controllers/
  services/
  repositories/
  middlewares/
  utils/
  tests/

  modules/
    health/
    users/
```

---

# Step 5 — Create Express App

Create:

```txt
src/app.ts
```

Responsibilities:
- initialize express
- register middleware
- register routes
- register error handlers

Keep app setup separate from server startup.

---

# Step 6 — Create Server Entry

Create:

```txt
src/server.ts
```

Responsibilities:
- load environment variables
- start server
- listen on port

---

# Step 7 — Create Routes

Create route files:

```txt
health.routes.ts
users.routes.ts
```

Purpose:
- define endpoints
- connect controllers

Routes should stay very small.

---

# Step 8 — Create Controllers

Purpose:
- receive request
- validate request
- call service
- return response

Controllers should NOT contain business logic.

---

# Step 9 — Create Services

Purpose:
- business logic
- data transformations
- orchestration

Example:
- create user
- fetch user
- validate user existence

This keeps controllers thin.

---

# Step 10 — Create Repository Layer

Purpose:
- abstract data access

For learning:
- use in-memory arrays

Later you can replace with:
- PostgreSQL
- MongoDB
- Prisma
- Sequelize

without changing services.

---

# Step 11 — Add Middleware

Create:

```txt
middlewares/
```

Add:

1. requestLogger.ts
2. notFound.ts
3. errorHandler.ts

---

# Step 12 — Add Environment Config

Create:

```txt
.env
```

Example:

```env
PORT=4000
NODE_ENV=development
```

Use dotenv.

---

# Step 13 — Add Testing Setup

Initialize Jest:

```bash
npx ts-jest config:init
```

Create tests:

```txt
src/tests/
```

Use:
- Jest
- Supertest

Test:
- status codes
- responses
- validation

---

# Step 14 — Add Scripts

Update package.json:

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "jest"
  }
}
```

---

# Step 15 — Learn Request Flow

Understand this flow carefully:

```txt
Request
  ↓
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Response
```

This is the foundation of scalable backend systems.

---

# Step 16 — Learn Middleware Flow

Understand middleware order:

```txt
Request
  ↓
Logger Middleware
  ↓
Routes
  ↓
Not Found Middleware
  ↓
Error Handler
```

Order matters heavily in Express.

---

# Step 17 — Learn Testing Philosophy

Test:
- API behavior
- status codes
- edge cases

Do NOT test internal implementation details.

Focus on:
- input
- output
- API contracts

---

# Step 18 — Future Upgrades

After mastering this base architecture, upgrade gradually:

## Level 2

Add:
- PostgreSQL
- Prisma
- Zod validation
- Winston logging

---

## Level 3

Add:
- Redis
- Docker
- Swagger
- Rate limiting
- Caching

---

## Level 4

Add:
- Message queues
- Background jobs
- Observability
- Monitoring
- Distributed tracing

---

# Final Learning Goal

By completing this project you will understand:

- backend architecture basics
- Express lifecycle
- TypeScript backend setup
- API layering
- middleware design
- testing fundamentals
- scalable project organization

This becomes your foundation for:
- FastAPI
- NestJS
- Spring Boot
- Go Fiber
- ASP.NET
- production backend systems