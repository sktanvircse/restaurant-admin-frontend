// src/modules/admin/dashboard/dashboard.type.ts
export interface DashboardSummary {
  orders: {
    total: number;
    pending: number;
    served: number;
  };
  revenue: number;
  foods: number;
  categories: number;
  staffs: number;
  tables: {
    total: number;
    available: number;
    occupied: number;
  };
}

export interface ChartData {
  date: string;
  total?: number;
  revenue?: number;
}

export interface DashboardData {
  summary: DashboardSummary;
  charts: {
    ordersByDay: ChartData[];
    revenueByDay: ChartData[];
  };
}

export interface AdminPerformance {
  name: string;
  totalOrders: number;
}