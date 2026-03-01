export interface Payment {
  id: number;
  order_id: number;
  amount: number;
  method: "cash" | "card";
  created_at?: string;
}

export interface CreatePaymentInput {
  order_id: number;
  amount: number;
  method: "cash" | "card";
}
