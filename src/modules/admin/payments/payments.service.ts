// src/modules/admin/payments/payments.service.ts
"use client";

import { useBaseService } from "@/modules/core/base.service";
import { Payment, CreatePaymentInput } from "./payments.type";
import { API_ENDPOINTS } from "@/endpoints/AdminApiEndPoints";

export const usePaymentService = () => {
  return useBaseService<Payment, CreatePaymentInput>(API_ENDPOINTS.PAYMENTS);
};
