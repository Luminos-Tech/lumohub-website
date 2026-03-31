import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Bắt buộc"),
  description: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  start_time: z.string().min(1, "Bắt buộc"),
  end_time: z.string().min(1, "Bắt buộc"),
  status: z.string().default("scheduled"),
  priority: z.string().default("normal"),
  color: z.string().default("#2563eb")
});

export type EventSchema = z.infer<typeof eventSchema>;
