// src/modules/admin/payments/payments.action.ts
"use client";

import { toast } from "react-toastify";
import { usePaymentService } from "./payments.service";
import { CreatePaymentInput, Payment } from "./payments.type";

export const usePaymentActions = () => {
  const service = usePaymentService();

  const getPayments = async (): Promise<Payment[]> => {
    try {
      const res = await service.findAll();
      return Array.isArray(res.data) ? res.data : [];
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch payments");
      return [];
    }
  };

  const createPayment = async (data: CreatePaymentInput) => {
    try {
      const res = await service.create(
        data as unknown as Record<string, unknown>,
      );
      toast.success("Payment added successfully");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add payment");
      throw error;
    }
  };

  return {
    getPayments,
    createPayment,
  };
};
