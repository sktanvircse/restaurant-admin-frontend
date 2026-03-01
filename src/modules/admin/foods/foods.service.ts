// src/modules/admin/foods/foods.service.ts
"use client";

import { useBaseService } from "@/modules/core/base.service";
import { Food, CreateFoodInput } from "./foods.type";
import { API_ENDPOINTS } from "@/endpoints/AdminApiEndPoints";

export const useFoodService = () => {
  return useBaseService<Food, CreateFoodInput>(API_ENDPOINTS.FOODS);
};
