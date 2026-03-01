export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    ME: "/api/auth/me",
  },

  CATEGORIES: "/api/categories",
  FOODS: "/api/foods",
  STAFFS: "/api/staffs",
  ROLES: "/api/roles",
  TABLES: "/api/tables",
  ORDERS: "/api/orders",
  PAYMENTS: "/api/payments",

  DASHBOARD: {
    SUMMARY: "/api/dashboard/summary",
    ORDERS_BY_DAY: "/api/reports/orders-by-day",
    REVENUE_BY_DAY: "/api/reports/revenue-by-day",
    ADMIN_PERFORMANCE: "/api/reports/admin-performance",
  },
};
