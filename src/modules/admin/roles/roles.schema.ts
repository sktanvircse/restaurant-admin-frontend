// src/modules/admin/roles/roles.schema.ts
import { z } from "zod";

export const roleSchema = z.object({
  name: z.string().min(2, "Role name must be at least 2 characters"),
  description: z.string().optional(),
  status: z.boolean().optional().default(true),
});

export type RoleFormData = z.infer<typeof roleSchema>;
