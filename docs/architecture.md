# Survey Observability Platform - Architecture

## 1. Overview

This repository is a monorepo for a survey observability platform. It is set up to host:

- A backend API service (Express + TypeScript)
- A frontend web application (React + Vite + TypeScript)
- Shared packages for cross-app contracts and telemetry utilities
- A simulator app for generating test traffic/events

The project already has the foundation for observability-first development (OpenTelemetry dependencies and dedicated telemetry folders), while most domain features are still scaffolded.

## 2. Monorepo Structure

Root-level orchestration:

- package manager workspaces via root `package.json`
- TurboRepo task orchestration via `turbo.json`
- `apps/*` for deployable applications
- `packages/*` for reusable libraries

Current workspace layout:

- `apps/api`: Node.js backend service
- `apps/frontend`: React web client
- `apps/simulator`: planned traffic/event simulator (currently empty)
- `packages/shared-types`: planned shared TypeScript contracts (currently empty)
- `packages/tracing-sdk`: planned shared telemetry SDK/helpers (currently empty)
- `docs`: architecture and design documentation

## 3. Current Implementation Status

Implemented now:

- Frontend Vite + React starter app is running baseline UI scaffolding.
- API environment validation exists in `apps/api/src/config/env.ts` using Zod.
- API folder boundaries are created (`controllers`, `routes`, `services`, etc.), but implementation files are not present yet.

Scaffolded but not implemented yet:

- API server bootstrap and route wiring
- business/domain logic
- data repositories and persistence integration
- socket event pipeline
- telemetry initialization/export pipeline
- shared type definitions package
- shared tracing SDK package
- simulator app logic

## 4. Logical Architecture (Target Shape)

### 4.1 Frontend (apps/frontend)

Responsibilities:

- Render dashboards and investigation views for survey health
- Query API endpoints for metrics and diagnostics
- Subscribe to real-time updates over Socket.IO
- Emit frontend traces for user actions and API latency

Planned page/domain areas already reflected by folders:

- `pages/api-health`
- `pages/dashbaord` (name currently misspelled in folder)
- `pages/drop-analysis`
- `pages/respondent`

### 4.2 API (apps/api)

Layered structure implied by folder boundaries:

- `routes`: HTTP route mapping and versioning
- `controllers`: request parsing, response mapping
- `services`: business and aggregation logic
- `repositories`: data access abstraction
- `middlewares`: auth, validation, error handling, rate limiting
- `sockets`: real-time event namespaces/channels
- `telemetry`: tracing/metrics instrumentation bootstrap
- `utils`: cross-cutting helpers

Configuration:

- `config/env.ts` validates runtime settings (port, CORS, URLs, JWT secret, OTEL endpoint, rate-limit knobs, log settings).

### 4.3 Shared Packages (packages/*)

Intended contract between apps:

- `shared-types`: DTOs, event schemas, API response types, socket payload types
- `tracing-sdk`: reusable instrumentation wrappers, span naming conventions, context propagation helpers

### 4.4 Simulator (apps/simulator)

Intended purpose:

- Generate synthetic survey traffic/failures
- Publish events to exercise API + socket + telemetry paths
- Support local and CI load/chaos scenarios

## 5. Runtime Interaction Model

Primary request/stream flow:

1. User interacts with frontend dashboard.
2. Frontend calls API endpoints and/or opens Socket.IO channel.
3. API routes delegate to controllers, then services.
4. Services use repositories for persistence or external data sources.
5. API emits real-time state updates via sockets.
6. Frontend updates visualizations in near real-time.
7. Telemetry spans/metrics are emitted by both frontend and backend to OTEL collector/backend.

## 6. Observability Architecture

Dependency-level readiness already exists:

- Backend includes OpenTelemetry Node SDK and auto-instrumentation packages.
- Frontend includes OpenTelemetry web tracing packages for fetch and XHR instrumentation.

Planned observability model:

- Trace context propagation from browser to API
- Standardized service/resource attributes
- Correlated spans for HTTP and Socket.IO operations
- Environment-driven OTLP endpoint configuration

## 7. Infrastructure and Deployment Notes

Current state:

- `docker-compose.yml` exists but is currently empty.

Expected near-term infrastructure shape:

- API container
- Frontend container (or static hosting)
- datastore/cache services as needed
- OpenTelemetry collector and backend (Jaeger/Tempo/Grafana stack or equivalent)

## 8. Risks and Gaps (Current)

- Most architecture is structural/scaffolded, not yet executable end-to-end.
- No implemented shared contracts yet; risk of type drift between frontend and API.
- No telemetry bootstrap code yet; observability dependencies are present but not wired.
- Empty infra compose file blocks reproducible local environment setup.

## 9. Recommended Build Sequence

1. Implement API bootstrap + health route + centralized error middleware.
2. Implement shared-types package and consume it in frontend/API.
3. Add basic repository + service flow for one dashboard use case.
4. Add Socket.IO server/client integration for a single live metric.
5. Wire OTEL tracing in backend and frontend with context propagation.
6. Fill docker-compose for local stack (API, frontend, collector, backing services).
7. Implement simulator traffic profiles for regression and load validation.

---

This document describes the architecture as of the current repository state and should be updated as implementation files are added.
