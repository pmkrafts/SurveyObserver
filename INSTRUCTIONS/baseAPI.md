# Goal

Generate a simple but production-inspired Node.js + Express + TypeScript backend architecture for learning purposes.

The project should focus on:
- clean folder structure
- scalable architecture basics
- TypeScript setup
- testing setup
- separation of concerns
- API versioning
- middleware architecture
- error handling
- environment configuration
- logging basics
- developer experience

This is NOT a production enterprise app.
This is a learning-first backend starter architecture.

---

# Tech Stack

Use:

- Node.js
- Express.js
- TypeScript
- Jest
- Supertest
- ts-node-dev
- dotenv
- ESLint
- Prettier

Package manager:
- npm

---

# Architecture Requirements

Use a layered architecture:

```txt
Route → Controller → Service → Repository
```

Keep repository simple using in-memory data or mock data.
Do not use a real database.

---

# Folder Structure

Generate a clean structure like:

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
  types/
  tests/

  modules/
    health/
    users/
```

---

# Features

Create only 2 simple modules:

1. Health Module
2. Users Module

---

# Health Module

Endpoint:

```txt
GET /api/v1/health
```

Response:

```json
{
  "success": true,
  "message": "Server running"
}
```

---

# Users Module

Endpoints:

```txt
GET /api/v1/users
GET /api/v1/users/:id
POST /api/v1/users
```

Use mock in-memory data.

---

# Middleware

Implement:

- request logger middleware
- error handler middleware
- not found middleware

---

# Validation

Use lightweight manual validation.
No heavy schema libraries.

Validate:
- missing name
- missing email

---

# Error Handling

Create a centralized error response structure.

Example:

```json
{
  "success": false,
  "message": "User not found"
}
```

---

# Testing

Setup:

- Jest
- Supertest

Include tests for:

```txt
GET /health
GET /users
POST /users
```

---

# TypeScript Setup

Include:

- tsconfig.json
- path aliases
- strict mode enabled

---

# Scripts

Add npm scripts:

```json
{
  "dev": "",
  "build": "",
  "start": "",
  "test": ""
}
```

---

# Learning Focus

The generated project should explain through comments:

- why folders exist
- why middleware is separated
- why services are useful
- why controllers should stay thin
- how testing works

Keep code beginner-friendly but structured like an SDE-1/SDE-2 backend starter.

---

# Non Goals

Do NOT include:

- Docker
- Authentication
- ORM
- Database
- Redis
- Kafka
- Microservices
- GraphQL

Keep it intentionally simple.

---

# Output Requirements

Generate:

1. Complete folder structure
2. All setup/config files
3. Fully working code
4. Sample tests
5. README.md
6. Comments for learning
7. Example environment file

Project should run using:

```bash
npm install
npm run dev
```

and tests using:

```bash
npm test
```



npm run dev --workspace=api
npm run build --workspace=api
npm run start --workspace=api