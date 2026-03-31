"use client";
import { useEffect, useState } from "react";
import { eventApi } from "@/features/events/api";
import type { EventItem } from "@/types/event";

export function useEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    try {
      const data = await eventApi.list();
      setEvents(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void reload(); }, []);
  return { events, loading, reload };
}
