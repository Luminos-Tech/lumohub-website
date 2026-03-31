"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { eventApi } from "@/features/events/api";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Modal } from "@/components/common/Modal";
import { ReminderPicker } from "./ReminderPicker";
import type { EventInput, EventItem } from "@/types/event";

type Props = { open: boolean; onClose: () => void; onSaved: (event: EventItem) => void; };

export function EventFormModal({ open, onClose, onSaved }: Props) {
  const { register, handleSubmit, reset } = useForm<EventInput>({ defaultValues: { title: "", description: "", location: "", start_time: "", end_time: "", status: "scheduled", priority: "normal", color: "#2563eb" } });
  const [remindBeforeMinutes, setRemindBeforeMinutes] = useState(30);
  const [channel, setChannel] = useState("web");

  const onSubmit = async (values: EventInput) => {
    const payload: EventInput = { ...values, reminders: [{ remind_before_minutes: remindBeforeMinutes, channel }] };
    const event = await eventApi.create(payload);
    onSaved(event);
    reset();
    onClose();
  };

  return (
    <Modal open={open} title="Tạo event" onClose={onClose}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div><label>Tiêu đề</label><Input {...register("title")} /></div>
        <div><label>Mô tả</label><Input {...register("description")} /></div>
        <div><label>Địa điểm</label><Input {...register("location")} /></div>
        <div className="grid gap-3 md:grid-cols-2">
          <div><label>Bắt đầu</label><Input type="datetime-local" {...register("start_time")} /></div>
          <div><label>Kết thúc</label><Input type="datetime-local" {...register("end_time")} /></div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div><label>Trạng thái</label><select className="w-full rounded-xl border border-slate-300 px-3 py-2" {...register("status")}><option value="scheduled">scheduled</option><option value="completed">completed</option><option value="canceled">canceled</option></select></div>
          <div><label>Ưu tiên</label><select className="w-full rounded-xl border border-slate-300 px-3 py-2" {...register("priority")}><option value="low">low</option><option value="normal">normal</option><option value="high">high</option></select></div>
        </div>
        <ReminderPicker minutes={remindBeforeMinutes} channel={channel} onMinutesChange={setRemindBeforeMinutes} onChannelChange={setChannel} />
        <Button type="submit">Lưu event</Button>
      </form>
    </Modal>
  );
}
