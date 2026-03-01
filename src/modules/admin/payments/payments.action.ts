import { usePaymentService } from "./payments.service";
import { CreatePaymentInput } from "./payments.type";

export const usePaymentActions = () => {
  const service = usePaymentService();

  return {
    getPayments: async () => (await service.findAll()).data,
    createPayment: async (data: CreatePaymentInput) =>
      (await service.create(data as unknown as Record<string, unknown>)).data,
  };
};
