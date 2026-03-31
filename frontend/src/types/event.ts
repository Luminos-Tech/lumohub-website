import type { Reminder, ReminderInput } from "./reminder";

export type EventItem = {
  id: number;
  user_id: number;
  title: string;
  description?: string | null;
  location?: string | null;
  start_time: string;
  end_time: string;
  status: string;
  priority: string;
  color?: string | null;
  created_at: string;
  updated_at: string;
  reminders: Reminder[];
};

export type EventInput = {
  title: string;
  description?: string | null;
  location?: string | null;
  start_time: string;
  end_time: string;
  status?: string;
  priority?: string;
  color?: string | null;
  reminders?: ReminderInput[];
};
