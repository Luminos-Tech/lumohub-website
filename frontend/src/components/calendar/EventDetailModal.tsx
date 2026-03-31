"use client";
import type { EventItem } from "@/types/event";
import { Modal } from "@/components/common/Modal";
import { formatDateTime } from "@/lib/utils";

type Props = { event: EventItem | null; open: boolean; onClose: () => void; };

export function EventDetailModal({ event, open, onClose }: Props) {
  return (
    <Modal open={open} title={event?.title || "Chi tiết event"} onClose={onClose}>
      {event ? <div className="space-y-2">
        <div><strong>Mô tả:</strong> {event.description || "-"}</div>
        <div><strong>Địa điểm:</strong> {event.location || "-"}</div>
        <div><strong>Bắt đầu:</strong> {formatDateTime(event.start_time)}</div>
        <div><strong>Kết thúc:</strong> {formatDateTime(event.end_time)}</div>
        <div><strong>Trạng thái:</strong> {event.status}</div>
        <div><strong>Ưu tiên:</strong> {event.priority}</div>
        <div><strong>Reminders:</strong><ul className="list-disc pl-6">{event.reminders?.map((item) => <li key={item.id}>{item.remind_before_minutes} phút trước qua {item.channel}</li>)}</ul></div>
      </div> : null}
    </Modal>
  );
}
