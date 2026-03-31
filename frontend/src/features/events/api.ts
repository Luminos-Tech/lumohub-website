import { api } from "@/lib/axios";
import type { EventInput, EventItem } from "@/types/event";

export const eventApi = {
  list: async () => (await api.get<EventItem[]>("/events")).data,
  calendar: async (start: string, end: string) => (await api.get("/events/calendar", { params: { start, end } })).data,
  get: async (id: number) => (await api.get<EventItem>(`/events/${id}`)).data,
  create: async (payload: EventInput) => (await api.post<EventItem>("/events", payload)).data,
  update: async (id: number, payload: Partial<EventInput>) => (await api.patch<EventItem>(`/events/${id}`, payload)).data,
  remove: async (id: number) => (await api.delete(`/events/${id}`)).data
};
