// src/modules/admin/settings/settings.schema.ts
import { z } from "zod";

export const settingsSchema = z.object({
  restaurant_name: z
    .string()
    .min(2, "Restaurant name must be at least 2 characters"),
  tax_percentage: z
    .number()
    .min(0, "Tax must be 0 or more")
    .max(100, "Tax cannot exceed 100%"),
  opening_time: z.string().min(1, "Opening time is required"),
  closing_time: z.string().min(1, "Closing time is required"),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
