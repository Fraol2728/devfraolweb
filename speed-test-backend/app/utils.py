import time
from typing import AsyncGenerator

from fastapi import HTTPException


def now_unix_seconds() -> int:
    return int(time.time())


def calculate_mbps(total_bytes: int, duration_seconds: float) -> float:
    if duration_seconds <= 0:
        return 0.0
    return round((total_bytes * 8) / duration_seconds / 1_000_000, 2)


def validate_upload_content_type(content_type: str | None) -> None:
    if not content_type:
        raise HTTPException(
            status_code=400,
            detail={
                "code": "missing_content_type",
                "message": "Content-Type header is required.",
            },
        )

    allowed_prefixes = (
        "application/octet-stream",
        "multipart/form-data",
    )
    if not any(content_type.startswith(prefix) for prefix in allowed_prefixes):
        raise HTTPException(
            status_code=415,
            detail={
                "code": "unsupported_media_type",
                "message": "Upload must be multipart/form-data or application/octet-stream.",
            },
        )


async def random_byte_stream(total_size: int, chunk_size: int) -> AsyncGenerator[bytes, None]:
    import secrets

    sent = 0
    while sent < total_size:
        current_chunk_size = min(chunk_size, total_size - sent)
        yield secrets.token_bytes(current_chunk_size)
        sent += current_chunk_size
