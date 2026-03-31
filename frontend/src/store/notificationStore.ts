"use client";
import { create } from "zustand";
import type { NotificationItem } from "@/types/notification";

type NotificationState = {
  notifications: NotificationItem[];
  setNotifications: (items: NotificationItem[]) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications })
}));
