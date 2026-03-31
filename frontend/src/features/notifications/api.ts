import { api } from "@/lib/axios";
import type { NotificationItem } from "@/types/notification";

export const notificationApi = {
  list: async () => (await api.get<NotificationItem[]>("/notifications")).data,
  markRead: async (id: number) => (await api.patch<NotificationItem>(`/notifications/${id}/read`)).data,
  markAllRead: async () => (await api.patch("/notifications/read-all")).data
};
