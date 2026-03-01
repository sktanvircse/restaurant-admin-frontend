// src/modules/admin/roles/roles.action.ts
"use client";

import { toast } from "react-toastify";
import { useRoleService } from "./roles.service";
import { CreateRoleInput, Role, UpdateRoleInput } from "./roles.type";

export const useRoleActions = () => {
  const service = useRoleService();

  const getRoles = async (): Promise<Role[]> => {
    try {
      const res = await service.findAll();
      return Array.isArray(res.data) ? res.data : [];
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch roles");
      return [];
    }
  };

  const getRole = async (id: number): Promise<Role | null> => {
    try {
      const res = await service.find(id);
      return res.data || null;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch role");
      return null;
    }
  };

  const createRole = async (data: CreateRoleInput) => {
    try {
      const res = await service.create(
        data as unknown as Record<string, unknown>,
      );
      toast.success("Role created successfully");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create role");
      throw error;
    }
  };

  const updateRole = async (id: number, data: UpdateRoleInput) => {
    try {
      const res = await service.update(
        id,
        data as unknown as Record<string, unknown>,
      );
      toast.success("Role updated successfully");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update role");
      throw error;
    }
  };

  const deleteRole = async (id: number) => {
    try {
      const res = await service.delete(id);
      toast.success("Role deleted successfully");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete role");
      throw error;
    }
  };

  return {
    getRoles,
    getRole,
    createRole,
    updateRole,
    deleteRole,
  };
};
