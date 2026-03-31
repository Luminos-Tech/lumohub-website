export type AdminAction = {
  id: number;
  admin_user_id: number;
  action: string;
  target_type?: string | null;
  target_id?: number | null;
  note?: string | null;
  created_at: string;
};
