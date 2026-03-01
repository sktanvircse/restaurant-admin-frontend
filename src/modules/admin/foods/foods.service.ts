// src/modules/admin/foods/foods.service.ts
"use client";

import { useBaseService } from "@/modules/core/base.service";
import { Food, CreateFoodInput } from "./foods.type";

export const useFoodService = () => {
  return useBaseService<Food, CreateFoodInput>("/foods");
};
