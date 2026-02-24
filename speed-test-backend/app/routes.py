import time

from fastapi import APIRouter, File, HTTPException, Query, Request, UploadFile
from fastapi.responses import JSONResponse, StreamingResponse

from .config import settings
from .utils import calculate_mbps, now_unix_seconds, random_byte_stream, validate_upload_content_type

router = APIRouter()


@router.get("/ping")
async def ping() -> dict[str, int | str]:
    return {
        "status": "ok",
        "server_time": now_unix_seconds(),
    }


@router.get("/download")
async def download_test(
    size_mb: int = Query(default=50, ge=1, le=100),
) -> StreamingResponse:
    total_size = size_mb * 1024 * 1024
    total_size = min(total_size, settings.download_max_size_bytes)

    headers = {
        "Cache-Control": "no-store",
        "Pragma": "no-cache",
        "Expires": "0",
        "Content-Disposition": f'attachment; filename="speed-test-{size_mb}mb.bin"',
        "X-Total-Bytes": str(total_size),
    }

    return StreamingResponse(
        random_byte_stream(total_size=total_size, chunk_size=settings.stream_chunk_size_bytes),
        media_type="application/octet-stream",
        headers=headers,
    )


@router.post("/upload")
async def upload_test(request: Request, file: UploadFile = File(...)) -> JSONResponse:
    validate_upload_content_type(request.headers.get("content-type"))

    start = time.perf_counter()
    bytes_received = 0

    try:
        while True:
            chunk = await file.read(settings.stream_chunk_size_bytes)
            if not chunk:
                break

            bytes_received += len(chunk)
            if bytes_received > settings.max_upload_size_bytes:
                raise HTTPException(
                    status_code=413,
                    detail={
                        "code": "payload_too_large",
                        "message": f"Maximum upload size is {settings.max_upload_size_bytes} bytes.",
                    },
                )

        duration = time.perf_counter() - start

        response_data = {
            "bytes_received": bytes_received,
            "duration_seconds": round(duration, 4),
            "upload_mbps": calculate_mbps(bytes_received, duration),
        }

        return JSONResponse(content=response_data)

    finally:
        await file.close()
