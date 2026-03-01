// src/modules/admin/orders/orders.type.ts
export interface Order {
  id: number;
  table_id: number;
  table_no?: string; // From JOIN in backend
  order_status: "pending" | "cooking" | "served" | "cancelled";
  total_price: number;
  admin_id?: number;
  order_time?: string;
  created_at?: string;
}

export interface CreateOrderInput {
  table_id: number;
  total_price: number;
  order_status?: "pending" | "cooking" | "served" | "cancelled";
}

export interface UpdateOrderStatusInput {
  order_status: "pending" | "cooking" | "served" | "cancelled";
}
