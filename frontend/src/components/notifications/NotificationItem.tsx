"use client";
import type { NotificationItem as NotificationType } from "@/types/notification";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/common/Button";
import { notificationApi } from "@/features/notifications/api";

export function NotificationItem({ item, onUpdated }: { item: NotificationType; onUpdated: () => void; }) {
  return (
    <div className="card">
      <div className="mb-2 flex items-center justify-between"><h3 className="font-bold">{item.title}</h3><span className="text-xs text-slate-500">{item.is_read ? "Đã đọc" : "Chưa đọc"}</span></div>
      <p className="text-sm text-slate-600">{item.content}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-slate-500">{formatDateTime(item.created_at)}</div>
        {!item.is_read ? <Button variant="secondary" onClick={async () => { await notificationApi.markRead(item.id); onUpdated(); }}>Đánh dấu đã đọc</Button> : null}
      </div>
    </div>
  );
}
