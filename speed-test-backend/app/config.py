from pydantic import BaseModel


class Settings(BaseModel):
    app_name: str = "Dev Fraol Academy Internet Speed Tester API"
    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]
    max_upload_size_bytes: int = 200 * 1024 * 1024  # 200 MB
    download_default_size_bytes: int = 50 * 1024 * 1024  # 50 MB
    download_max_size_bytes: int = 100 * 1024 * 1024  # 100 MB
    stream_chunk_size_bytes: int = 1024 * 1024  # 1 MB


settings = Settings()
