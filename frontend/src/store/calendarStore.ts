"use client";
import { create } from "zustand";
import type { EventItem } from "@/types/event";

type CalendarState = {
  events: EventItem[];
  setEvents: (events: EventItem[]) => void;
  selectedEvent: EventItem | null;
  setSelectedEvent: (event: EventItem | null) => void;
};

export const useCalendarStore = create<CalendarState>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
  selectedEvent: null,
  setSelectedEvent: (selectedEvent) => set({ selectedEvent })
}));
