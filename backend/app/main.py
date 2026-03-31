from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings
from app.core.logging import logger
from app.core.scheduler import scheduler, shutdown_scheduler, start_scheduler
from app.tasks.cleanup_sessions import run_cleanup_sessions
from app.tasks.reminder_checker import run_reminder_checker


@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler.add_job(run_reminder_checker, "interval", seconds=30, id="reminder_checker", replace_existing=True)
    scheduler.add_job(run_cleanup_sessions, "interval", hours=1, id="cleanup_sessions", replace_existing=True)
    start_scheduler()
    logger.info("App startup completed")
    yield
    shutdown_scheduler()
    logger.info("App shutdown completed")


app = FastAPI(title=settings.app_name, version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/")
def root():
    return {"app": settings.app_name, "env": settings.app_env, "message": "LumoHub backend is running"}

@app.get("/health")
def health():
    return {"status": "ok"}
