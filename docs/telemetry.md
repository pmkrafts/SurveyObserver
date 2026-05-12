# Telemetry Design and Status

## 1. Current Status

Telemetry is partially prepared but not fully wired end-to-end.

What exists now:

- Frontend dependencies include OpenTelemetry web packages.
- Backend has structural folders for telemetry concerns.
- Request-level logging is active in API middleware.

What is not yet implemented:

- No active OpenTelemetry SDK bootstrap in API runtime.
- No OTLP exporter wiring in backend/frontend runtime path.
- No collector/backend telemetry stack in docker-compose.

## 2. Current Observability Signals

Available now:

- Application logs from requestLogger with:
	- method
	- path
	- statusCode
	- durationMs

Response shape standardization and centralized error handling provide consistent error visibility for API clients.

## 3. Proposed Trace Model

Target span boundaries:

- Frontend user action span (page load, submit form)
- Frontend HTTP client span (/api/v1/users calls)
- Backend HTTP server span (Express route)
- Service/repository spans around Prisma queries

Propagation target:

- W3C tracecontext headers from browser to API

## 4. Metrics Model (Planned)

Suggested baseline metrics:

- http.server.request.count by route/method/status
- http.server.request.duration
- db.query.duration for Prisma operations
- error.count by error type and status code

## 5. Logging Conventions

Current API log format is structured and includes metadata as JSON.

Recommended next addition:

- include correlation fields (traceId, spanId, requestId) when tracing is enabled.

## 6. Implementation Roadmap

1. Add backend telemetry bootstrap file loaded before Express app startup.
2. Configure NodeSDK auto instrumentation for HTTP and Prisma.
3. Add OTLP exporter endpoint via environment variable.
4. Add frontend tracing provider and fetch/XHR instrumentation bootstrap.
5. Configure collector in docker-compose and forward to Jaeger/Tempo.
6. Add cross-service trace correlation in logs.

## 7. Environment Variables (Planned)

- OTEL_SERVICE_NAME
- OTEL_EXPORTER_OTLP_ENDPOINT
- OTEL_EXPORTER_OTLP_HEADERS (optional)
- OTEL_TRACES_SAMPLER
- OTEL_TRACES_SAMPLER_ARG

## 8. Verification Strategy

When telemetry is wired:

- Trigger GET/POST /api/v1/users from UI.
- Verify a single trace spans browser and API segments.
- Confirm error traces for validation and duplicate-email paths.
- Check latency distributions for route and DB spans.
