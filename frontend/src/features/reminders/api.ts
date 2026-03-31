import { api } from "@/lib/axios";
import type { Reminder, ReminderInput } from "@/types/reminder";

export const reminderApi = {
  listForEvent: async (eventId: number) => (await api.get<Reminder[]>(`/reminders/event/${eventId}`)).data,
  createForEvent: async (eventId: number, payload: ReminderInput) => (await api.post<Reminder>(`/reminders/event/${eventId}`, payload)).data,
  update: async (id: number, payload: Partial<ReminderInput>) => (await api.patch<Reminder>(`/reminders/${id}`, payload)).data,
  remove: async (id: number) => (await api.delete(`/reminders/${id}`)).data
};
