export type User = {
  id: number;
  full_name: string;
  email: string;
  phone?: string | null;
  avatar_url?: string | null;
  role: "user" | "admin" | string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
