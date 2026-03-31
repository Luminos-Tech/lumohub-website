import { z } from "zod";

export const profileSchema = z.object({
  full_name: z.string().min(2, "Tối thiểu 2 ký tự"),
  phone: z.string().optional().nullable(),
  avatar_url: z.string().optional().nullable()
});

export type ProfileSchema = z.infer<typeof profileSchema>;
