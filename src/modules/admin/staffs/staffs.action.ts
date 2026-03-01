// src/modules/admin/staffs/staffs.action.ts
"use client";

import { toast } from "react-toastify";
import { useStaffService } from "./staffs.service";
import { CreateStaffInput, Staff, UpdateStaffInput } from "./staffs.type";

export const useStaffActions = () => {
  const service = useStaffService();

  const getStaffs = async (): Promise<Staff[]> => {
    try {
      const res = await service.findAll();
      return Array.isArray(res.data) ? res.data : [];
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch staffs");
      return [];
    }
  };

  const getStaff = async (id: number): Promise<Staff | null> => {
    try {
      const res = await service.find(id);
      return res.data || null;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch staff");
      return null;
    }
  };

  const createStaff = async (data: CreateStaffInput) => {
    try {
      const res = await service.create(
        data as unknown as Record<string, unknown>,
      );
      toast.success("Staff added successfully");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add staff");
      throw error;
    }
  };

  const updateStaff = async (id: number, data: UpdateStaffInput) => {
    try {
      const res = await service.update(
        id,
        data as unknown as Record<string, unknown>,
      );
      toast.success("Staff updated successfully");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update staff");
      throw error;
    }
  };

  const deleteStaff = async (id: number) => {
    try {
      const res = await service.delete(id);
      toast.success("Staff deleted successfully");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete staff");
      throw error;
    }
  };

  return {
    getStaffs,
    getStaff,
    createStaff,
    updateStaff,
    deleteStaff,
  };
};
