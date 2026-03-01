// src/modules/admin/orders/orders.action.ts
"use client";

import { toast } from "react-toastify";
import { useOrderService } from "./orders.service";
import { CreateOrderInput, Order, UpdateOrderStatusInput } from "./orders.type";

export const useOrderActions = () => {
  const service = useOrderService();

  const getOrders = async (): Promise<Order[]> => {
    try {
      const res = await service.findAll();
      return Array.isArray(res.data) ? res.data : [];
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch orders");
      return [];
    }
  };

  const getOrder = async (id: number): Promise<Order | null> => {
    try {
      const res = await service.find(id);
      return res.data || null;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch order");
      return null;
    }
  };

  const createOrder = async (data: CreateOrderInput) => {
    try {
      const res = await service.create(
        data as unknown as Record<string, unknown>,
      );
      toast.success("Order created successfully");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create order");
      throw error;
    }
  };

  const updateOrderStatus = async (id: number, order_status: string) => {
    try {
      const res = await service.patchItem(id, { order_status });
      toast.success("Order status updated successfully");
      return res.data;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update order status",
      );
      throw error;
    }
  };

  const deleteOrder = async (id: number) => {
    try {
      const res = await service.delete(id);
      toast.success("Order deleted successfully");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete order");
      throw error;
    }
  };

  return {
    getOrders,
    getOrder,
    createOrder,
    updateOrderStatus,
    deleteOrder,
  };
};
