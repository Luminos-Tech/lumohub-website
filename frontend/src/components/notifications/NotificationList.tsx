"use client";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationItem } from "./NotificationItem";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/common/Button";
import { notificationApi } from "@/features/notifications/api";

export function NotificationList() {
  const { notifications, reload } = useNotifications();
  if (!notifications.length) {
    return <EmptyState title="Chưa có thông báo" description="Thông báo nhắc lịch sẽ xuất hiện tại đây." />;
  }
  return (
    <div className="space-y-4">
      <div className="flex justify-end"><Button variant="secondary" onClick={async () => { await notificationApi.markAllRead(); await reload(); }}>Đánh dấu đọc tất cả</Button></div>
      {notifications.map((item) => <NotificationItem key={item.id} item={item} onUpdated={() => void reload()} />)}
    </div>
  );
}
