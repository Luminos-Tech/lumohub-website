"use client";
import { useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEvents } from "@/hooks/useCalendar";
import { useCalendarStore } from "@/store/calendarStore";
import { EventDetailModal } from "./EventDetailModal";
import { EventFormModal } from "./EventFormModal";
import { CalendarToolbar } from "./CalendarToolbar";
import type { EventItem } from "@/types/event";

export function CalendarView() {
  const { events, reload } = useEvents();
  const setSelectedEvent = useCalendarStore((s) => s.setSelectedEvent);
  const selectedEvent = useCalendarStore((s) => s.selectedEvent);
  const [detailOpen, setDetailOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const calendarEvents = useMemo(() => events.map((event) => ({ id: String(event.id), title: event.title, start: event.start_time, end: event.end_time, color: event.color || "#2563eb" })), [events]);

  const onEventClick = (eventId: number) => {
    const found = events.find((item) => item.id === eventId) || null;
    setSelectedEvent(found);
    setDetailOpen(true);
  };

  const onSaved = async (event: EventItem) => {
    setSelectedEvent(event);
    await reload();
  };

  return (
    <div className="card">
      <CalendarToolbar onCreate={() => setFormOpen(true)} />
      <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} initialView="dayGridMonth" height="auto" events={calendarEvents} eventClick={(info) => onEventClick(Number(info.event.id))} />
      <EventDetailModal event={selectedEvent} open={detailOpen} onClose={() => setDetailOpen(false)} />
      <EventFormModal open={formOpen} onClose={() => setFormOpen(false)} onSaved={onSaved} />
    </div>
  );
}
