// src/modules/admin/payments/payments.service.ts
"use client";

import { useBaseService } from "@/modules/core/base.service";
import { Payment, CreatePaymentInput } from "./payments.type";

export const usePaymentService = () => {
  return useBaseService<Payment, CreatePaymentInput>("/payments");
};
