"use client";
import { useEffect, useState } from "react";
import { notificationApi } from "@/features/notifications/api";
import type { NotificationItem } from "@/types/notification";

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    try {
      const data = await notificationApi.list();
      setNotifications(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void reload(); }, []);
  return { notifications, loading, reload };
}
