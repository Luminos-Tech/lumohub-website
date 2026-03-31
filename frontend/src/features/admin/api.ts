import { api } from "@/lib/axios";
import type { EventItem } from "@/types/event";
import type { User } from "@/types/user";
import type { AdminAction } from "./types";

export const adminApi = {
  listUsers: async () => (await api.get<User[]>("/admin/users")).data,
  listLogs: async () => (await api.get("/admin/logs")).data,
  listEvents: async () => (await api.get<EventItem[]>("/admin/events")).data,
  listActions: async () => (await api.get<AdminAction[]>("/admin/actions")).data,
  lockUser: async (userId: number) => (await api.patch<User>(`/admin/users/${userId}/lock`)).data,
  unlockUser: async (userId: number) => (await api.patch<User>(`/admin/users/${userId}/unlock`)).data,
  updateRole: async (userId: number, role: string) => (await api.patch<User>(`/admin/users/${userId}/role`, { role })).data
};
