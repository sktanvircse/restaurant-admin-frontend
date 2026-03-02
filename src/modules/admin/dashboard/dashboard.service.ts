// src/modules/admin/dashboard/dashboard.service.ts
"use client";

import { useBaseService } from "@/modules/core/base.service";
import { DashboardData } from "./dashboard.type";

export const useDashboardService = () => {
  const baseService = useBaseService<DashboardData>("/dashboard/summary");

  return {
    getDashboardData: () => baseService.findAll(),
  };
};
