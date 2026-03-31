"use client";
import Link from "next/link";
import { useEvents } from "@/hooks/useCalendar";
import { EventCard } from "@/components/calendar/EventCard";

export default function EventsPage() {
  const { events } = useEvents();
  return <div><h1 className="section-title">Danh sách event</h1><div className="grid gap-4 md:grid-cols-2">{events.map((event) => <Link key={event.id} href={`/events/${event.id}`}><EventCard event={event} /></Link>)}</div></div>;
}
