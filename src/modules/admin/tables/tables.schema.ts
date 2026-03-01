// src/modules/admin/tables/tables.schema.ts
import { z } from "zod";

export const tableSchema = z.object({
  table_no: z.string().min(1, "Table number is required"),
  capacity: z.number().positive("Capacity must be positive"),
  status: z.enum(["available", "occupied"]).optional().default("available"),
});

export type TableFormData = z.infer<typeof tableSchema>;
