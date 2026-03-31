"use client";
import { useEffect, useState } from "react";
import { eventApi } from "@/features/events/api";
import { useParams } from "next/navigation";
import type { EventItem } from "@/types/event";
import { EventCard } from "@/components/calendar/EventCard";

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventItem | null>(null);

  useEffect(() => { eventApi.get(Number(params.id)).then(setEvent); }, [params.id]);
  if (!event) return <div>Đang tải...</div>;
  return <div><h1 className="section-title">Chi tiết event</h1><EventCard event={event} /></div>;
}
