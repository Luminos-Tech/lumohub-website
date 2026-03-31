export type Reminder = {
  id: number;
  event_id: number;
  remind_before_minutes: number;
  channel: string;
  is_sent: boolean;
  sent_at?: string | null;
  created_at: string;
};

export type ReminderInput = { remind_before_minutes: number; channel: string; };
