import type { EventItem } from "@/types/event";
import { formatDateTime } from "@/lib/utils";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="card">
      <div className="mb-2 flex items-center justify-between"><h3 className="font-bold">{event.title}</h3><span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{event.priority}</span></div>
      <p className="text-sm text-slate-500">{event.description || "Không có mô tả"}</p>
      <div className="mt-3 text-sm">
        <div>Bắt đầu: {formatDateTime(event.start_time)}</div>
        <div>Kết thúc: {formatDateTime(event.end_time)}</div>
        <div>Địa điểm: {event.location || "-"}</div>
      </div>
    </div>
  );
}
