import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2),
  is_active: z.boolean().optional(),
});