// src/modules/admin/reports/reports.type.ts
export interface OrdersByDay {
  date: string;
  total: number;
}

export interface RevenueByDay {
  date: string;
  revenue: number;
}

export interface AdminPerformance {
  name: string;
  totalOrders: number;
}
