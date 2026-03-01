import { useBaseService } from "@/modules/core/base.service";
import { Payment, CreatePaymentInput } from "./payments.type";
import { API_ENDPOINTS } from "@/endpoints/AdminApiEndPoints";

export const usePaymentService = () => {
  return useBaseService<Payment, CreatePaymentInput>(API_ENDPOINTS.PAYMENTS);
};
