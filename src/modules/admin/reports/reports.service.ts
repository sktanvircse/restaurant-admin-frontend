// src/modules/admin/reports/reports.service.ts
"use client";

import { useBaseService } from "@/modules/core/base.service";

export const useReportsService = () => {
  const baseService = useBaseService("/reports");

  return {
    getOrdersByDay: () =>
      baseService.getAxiosInstance().get("/reports/orders-by-day"),
    getRevenueByDay: () =>
      baseService.getAxiosInstance().get("/reports/revenue-by-day"),
    getAdminPerformance: () =>
      baseService.getAxiosInstance().get("/reports/admin-performance"),
  };
};
