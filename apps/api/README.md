# API Backend Starter (Learning First)

This package is a simple but production-inspired backend starter using Node.js, Express, and TypeScript.

## Why this structure

- `routes`: maps HTTP endpoints to controller methods.
- `controllers`: keeps request/response handling thin.
- `services`: contains business logic so controllers stay small.
- `repositories`: data access boundary (in-memory for now).
- `middlewares`: reusable cross-cutting logic (logger, 404, error handling).
- `modules`: feature-level grouping to keep growth organized.

Layer flow used here:

Route -> Controller -> Service -> Repository

## Endpoints

- `GET /api/v1/health`
- `GET /api/v1/users`
- `GET /api/v1/users/:id`
- `POST /api/v1/users`

## Run locally

1. Install dependencies:
   - `npm install`
2. Start dev server:
   - `npm run dev`
3. Build:
   - `npm run build`
4. Start built app:
   - `npm run start`

## Testing

Uses Jest + Supertest.

Run tests:

- `npm test`

Tests call the Express app directly, so no separate server process is required.

## Environment

Copy `.env.example` to `.env` and adjust values as needed.

## Database & Cache (Local Development)

Start PostgreSQL and Redis from the monorepo root:

```bash
# From root folder
docker-compose up -d

# Stop services
docker-compose down

# Reset data (remove volumes)
docker-compose down -v
```

Services:
- **PostgreSQL**: localhost:5432 (user: postgres, password: postgres, db: api_dev)
- **Redis**: localhost:6379
