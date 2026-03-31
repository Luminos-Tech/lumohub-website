"use client";
import { Input } from "@/components/common/Input";

type Props = { minutes: number; channel: string; onMinutesChange: (value: number) => void; onChannelChange: (value: string) => void; };

export function ReminderPicker({ minutes, channel, onMinutesChange, onChannelChange }: Props) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div><label>Số phút nhắc trước</label><Input type="number" value={minutes} onChange={(e) => onMinutesChange(Number(e.target.value))} /></div>
      <div><label>Kênh</label><select className="w-full rounded-xl border border-slate-300 px-3 py-2" value={channel} onChange={(e) => onChannelChange(e.target.value)}><option value="web">Web</option><option value="mobile">Mobile</option><option value="lumo">LUMO</option></select></div>
    </div>
  );
}
