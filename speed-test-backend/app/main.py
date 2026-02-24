from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .config import settings
from .routes import router

app = FastAPI(title=settings.app_name, version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "healthy"}


@app.exception_handler(HTTPException)
async def http_exception_handler(_: Request, exc: HTTPException) -> JSONResponse:
    detail = exc.detail
    if isinstance(detail, dict):
        payload = {
            "error": {
                "code": detail.get("code", "http_error"),
                "message": detail.get("message", "Request failed."),
            }
        }
    else:
        payload = {
            "error": {
                "code": "http_error",
                "message": str(detail),
            }
        }

    return JSONResponse(status_code=exc.status_code, content=payload)


@app.exception_handler(Exception)
async def unhandled_exception_handler(_: Request, exc: Exception) -> JSONResponse:
    return JSONResponse(
        status_code=500,
        content={
            "error": {
                "code": "internal_server_error",
                "message": "Unexpected server error.",
                "detail": str(exc),
            }
        },
    )


app.include_router(router)
