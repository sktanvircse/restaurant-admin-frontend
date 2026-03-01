import { z } from "zod";

export const foodSchema = z.object({
  name: z.string().min(2, "Food name is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  category_id: z.number(),
  is_available: z.boolean().optional(),
});
