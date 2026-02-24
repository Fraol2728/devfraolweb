# Dev Fraol Academy — Internet Speed Tester Backend

FastAPI backend service for internet speed testing with async streaming endpoints for ping, download, and upload tests.

## Features

- Async-first FastAPI architecture.
- `GET /ping` latency check with server timestamp.
- `GET /download` chunked random-byte stream (1MB chunks, configurable size 1–100MB).
- `POST /upload` streamed upload measurement (no disk write).
- Structured JSON errors.
- CORS enabled for frontend integration.
- Max upload size protection (200MB default).
- Docker-ready deployment.

## Project structure

```txt
speed-test-backend/
├── app/
│   ├── main.py
│   ├── routes.py
│   ├── utils.py
│   └── config.py
├── requirements.txt
├── Dockerfile
└── README.md
```

## Installation

```bash
cd speed-test-backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run locally

```bash
uvicorn app.main:app --workers 4 --host 0.0.0.0 --port 8000
```

## API endpoints

### `GET /health`
Basic readiness endpoint.

### `GET /ping`
Returns status and current server UNIX timestamp.

Example response:

```json
{
  "status": "ok",
  "server_time": 1700000000
}
```

### `GET /download?size_mb=50`
Streams a random binary payload in chunks without caching.

Headers include:
- `Cache-Control: no-store`
- `Content-Type: application/octet-stream`
- `X-Total-Bytes`

### `POST /upload`
Accepts multipart upload and reads file in chunks (no persistence). Returns bytes, duration, and measured upload Mbps.

Example response:

```json
{
  "bytes_received": 52428800,
  "duration_seconds": 2.31,
  "upload_mbps": 181.4
}
```

## Docker

Build and run:

```bash
docker build -t speed-test-backend .
docker run --rm -p 8000:8000 speed-test-backend
```

## Scalability notes

- Run with multiple workers for CPU/multi-core usage.
- Place behind Nginx/load balancer in production.
- Scale horizontally for high concurrency.
- Keep speed endpoints uncached.
