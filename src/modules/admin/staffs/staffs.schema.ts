import { z } from "zod";

export const staffSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  role_id: z.number(),
  is_active: z.boolean().optional(),
});
