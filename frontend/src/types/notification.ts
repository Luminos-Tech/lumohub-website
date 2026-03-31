export type NotificationItem = {
  id: number;
  user_id: number;
  event_id?: number | null;
  title: string;
  content: string;
  channel: string;
  is_read: boolean;
  created_at: string;
  read_at?: string | null;
};
