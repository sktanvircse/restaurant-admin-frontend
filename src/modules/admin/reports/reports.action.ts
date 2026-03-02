// src/modules/admin/reports/reports.action.ts
"use client";

import { toast } from "react-toastify";
import { useReportsService } from "./reports.service";
import { OrdersByDay, RevenueByDay, AdminPerformance } from "./reports.type";

export const useReportsActions = () => {
  const service = useReportsService();

  const getOrdersByDay = async (): Promise<OrdersByDay[]> => {
    try {
      const res = await service.getOrdersByDay();
      return Array.isArray(res.data) ? res.data : [];
    } catch (error: any) {
      toast.error("Failed to fetch orders report");
      return [];
    }
  };

  const getRevenueByDay = async (): Promise<RevenueByDay[]> => {
    try {
      const res = await service.getRevenueByDay();
      return Array.isArray(res.data) ? res.data : [];
    } catch (error: any) {
      toast.error("Failed to fetch revenue report");
      return [];
    }
  };

  const getAdminPerformance = async (): Promise<AdminPerformance[]> => {
    try {
      const res = await service.getAdminPerformance();
      return Array.isArray(res.data) ? res.data : [];
    } catch (error: any) {
      toast.error("Failed to fetch admin performance");
      return [];
    }
  };

  return {
    getOrdersByDay,
    getRevenueByDay,
    getAdminPerformance,
  };
};
