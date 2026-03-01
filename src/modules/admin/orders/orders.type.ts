export interface Order {
  id: number;
  table_id: number;
  status: "pending" | "cooking" | "served" | "cancelled";
  total_amount: number;
  created_by: number;
  created_at?: string;
}

export interface CreateOrderInput {
  table_id: number;
  status?: "pending" | "cooking" | "served" | "cancelled";
  total_amount: number;
}
