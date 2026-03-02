// src/modules/admin/dashboard/dashboard.action.ts
"use client";

import { toast } from "react-toastify";
import { useDashboardService } from "./dashboard.service";
import { DashboardData } from "./dashboard.type";

export const useDashboardActions = () => {
  const service = useDashboardService();

  const getDashboardData = async (): Promise<DashboardData | null> => {
    try {
      const res = await service.getDashboardData();
      return res.data?.[0] || null;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch dashboard data",
      );
      return null;
    }
  };

  return {
    getDashboardData,
  };
};
