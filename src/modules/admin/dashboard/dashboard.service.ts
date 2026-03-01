import { useBaseService } from "@/modules/core/base.service";
import { DashboardSummary } from "./dashboard.type";
import { API_ENDPOINTS } from "@/endpoints/AdminApiEndPoints";

export const useDashboardService = () => {
  return {
    summary: useBaseService<DashboardSummary>(API_ENDPOINTS.DASHBOARD.SUMMARY),
    ordersByDay: useBaseService<any>(API_ENDPOINTS.DASHBOARD.ORDERS_BY_DAY),
    revenueByDay: useBaseService<any>(API_ENDPOINTS.DASHBOARD.REVENUE_BY_DAY),
  };
};
