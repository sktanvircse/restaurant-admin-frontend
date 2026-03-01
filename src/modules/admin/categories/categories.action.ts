// src/modules/admin/categories/categories.action.ts
"use client";

import { toast } from "react-toastify";
import { useCategoryService } from "./categories.service";
import { CreateCategoryInput, Category } from "./categories.type";

export const useCategoryActions = () => {
  const service = useCategoryService();

  const getCategories = async (): Promise<Category[]> => {
    try {
      const res = await service.findAll();
      // Backend returns raw array directly
      return Array.isArray(res.data) ? res.data : [];
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch categories",
      );
      return [];
    }
  };

  const getCategory = async (id: number): Promise<Category | null> => {
    try {
      const res = await service.find(id);
      // Backend returns single object
      return res.data || null;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch category");
      return null;
    }
  };

  const createCategory = async (data: CreateCategoryInput) => {
    try {
      // Map is_active to status for backend
      const payload = {
        name: data.name,
        status: data.is_active ? 1 : 0, // Backend expects status (1/0)
      };

      const res = await service.create(payload);
      toast.success("Category created successfully");
      return res.data;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create category",
      );
      throw error;
    }
  };

  const updateCategory = async (
    id: number,
    data: Partial<CreateCategoryInput>,
  ) => {
    try {
      // Map is_active to status for backend
      const payload: any = {
        name: data.name,
      };

      if (data.is_active !== undefined) {
        payload.status = data.is_active ? 1 : 0; // Backend expects status (1/0)
      }

      const res = await service.update(id, payload);
      toast.success("Category updated successfully");
      return res.data;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update category",
      );
      throw error;
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      const res = await service.delete(id);
      toast.success("Category deleted successfully");
      return res.data;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete category",
      );
      throw error;
    }
  };

  return {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
  };
};
