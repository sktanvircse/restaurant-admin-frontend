// src/modules/admin/tables/tables.action.ts
"use client";

import { toast } from "react-toastify";
import { useTableService } from "./tables.service";
import { CreateTableInput, Table, UpdateTableInput } from "./tables.type";

export const useTableActions = () => {
  const service = useTableService();

  const getTables = async (): Promise<Table[]> => {
    try {
      const res = await service.findAll();
      return Array.isArray(res.data) ? res.data : [];
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch tables");
      return [];
    }
  };

  const getTable = async (id: number): Promise<Table | null> => {
    try {
      const res = await service.find(id);
      return res.data || null;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch table");
      return null;
    }
  };

  const createTable = async (data: CreateTableInput) => {
    try {
      const res = await service.create(
        data as unknown as Record<string, unknown>,
      );
      toast.success("Table created successfully");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create table");
      throw error;
    }
  };

  const updateTable = async (id: number, data: UpdateTableInput) => {
    try {
      const res = await service.update(
        id,
        data as unknown as Record<string, unknown>,
      );
      toast.success("Table updated successfully");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update table");
      throw error;
    }
  };

  const deleteTable = async (id: number) => {
    try {
      const res = await service.delete(id);
      toast.success("Table deleted successfully");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete table");
      throw error;
    }
  };

  return {
    getTables,
    getTable,
    createTable,
    updateTable,
    deleteTable,
  };
};
