// src/modules/admin/foods/foods.action.ts
"use client";

import { toast } from "react-toastify";
import { useFoodService } from "./foods.service";
import { CreateFoodInput, Food, UpdateFoodInput } from "./foods.type";

export const useFoodActions = () => {
  const service = useFoodService();

  const getFoods = async (): Promise<Food[]> => {
    try {
      const res = await service.findAll();
      return Array.isArray(res.data) ? res.data : [];
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch foods");
      return [];
    }
  };

  const getFood = async (id: number): Promise<Food | null> => {
    try {
      const res = await service.find(id);
      return res.data || null;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch food");
      return null;
    }
  };

  const createFood = async (data: CreateFoodInput) => {
    try {
      const res = await service.create(
        data as unknown as Record<string, unknown>,
      );
      toast.success("Food added successfully");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add food");
      throw error;
    }
  };

  const updateFood = async (id: number, data: UpdateFoodInput) => {
    try {
      const res = await service.update(id, data as Record<string, unknown>);
      toast.success("Food updated successfully");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update food");
      throw error;
    }
  };

  const deleteFood = async (id: number) => {
    try {
      const res = await service.delete(id);
      toast.success("Food deleted successfully");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete food");
      throw error;
    }
  };

  return {
    getFoods,
    getFood,
    createFood,
    updateFood,
    deleteFood,
  };
};
