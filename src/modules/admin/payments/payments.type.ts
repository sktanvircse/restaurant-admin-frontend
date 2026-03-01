// src/modules/admin/payments/payments.type.ts
export interface Payment {
  id: number;
  order_id: number;
  amount: number;
  method: "cash" | "card" | "online";
  payment_time?: string;
  admin_id?: number;
  created_at?: string;
}

export interface CreatePaymentInput {
  order_id: number;
  amount: number;
  method: "cash" | "card" | "online";
}
