// src/modules/admin/roles/roles.action.ts
"use client";

import { toast } from "react-toastify";
import { useRoleService } from "./roles.service";

export const useRoleActions = () => {
  const service = useRoleService();

  const getRoles = async () => {
    try {
      const res = await service.findAll();
      return Array.isArray(res.data) ? res.data : [];
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch roles");
      return [];
    }
  };

  return { getRoles };
};