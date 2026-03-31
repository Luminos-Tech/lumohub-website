from __future__ import annotations

from apscheduler.schedulers.background import BackgroundScheduler

from app.core.logging import logger

scheduler = BackgroundScheduler(timezone="UTC")


def start_scheduler() -> None:
    if not scheduler.running:
        scheduler.start()
        logger.info("Scheduler started")


def shutdown_scheduler() -> None:
    if scheduler.running:
        scheduler.shutdown(wait=False)
        logger.info("Scheduler stopped")
