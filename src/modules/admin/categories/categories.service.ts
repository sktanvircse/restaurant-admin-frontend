// src/modules/admin/categories/categories.service.ts
"use client";

import { useBaseService } from "@/modules/core/base.service";
import { Category, CreateCategoryInput } from "./categories.type";

export const useCategoryService = () => {
  const baseService = useBaseService<Category, CreateCategoryInput>(
    "/categories",
  );

  return {
    findAll: () => baseService.findAll(),
    find: (id: number | string) => baseService.find(String(id)),
    create: (data: Record<string, unknown>) => baseService.create(data),
    update: (id: number | string, data: Record<string, unknown>) =>
      baseService.update(String(id), data),
    delete: (id: number | string) => baseService.delete(String(id)),
  };
};
