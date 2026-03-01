// src/modules/admin/staffs/staffs.schema.ts
import { z } from "zod";

export const staffSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(5, "Phone must be at least 5 characters"),
  role_id: z.number().positive("Role is required"),
  status: z.boolean().optional().default(true),
});

export type StaffFormData = z.infer<typeof staffSchema>;
