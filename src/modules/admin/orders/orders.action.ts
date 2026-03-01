import { useOrderService } from "./orders.service";
import { CreateOrderInput } from "./orders.type";

export const useOrderActions = () => {
  const service = useOrderService();

  return {
    getOrders: async () => (await service.findAll()).data,
    createOrder: async (data: CreateOrderInput) =>
      (await service.create(data as unknown as Record<string, unknown>)).data,
    updateOrder: async (id: number, data: Partial<CreateOrderInput>) =>
      (await service.update(id, data as unknown as Record<string, unknown>))
        .data,
    deleteOrder: async (id: number) => (await service.delete(id)).data,
  };
};
