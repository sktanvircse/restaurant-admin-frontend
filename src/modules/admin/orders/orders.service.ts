// src/modules/admin/orders/orders.service.ts
"use client";

import { useBaseService } from "@/modules/core/base.service";
import { Order, CreateOrderInput } from "./orders.type";
import { API_ENDPOINTS } from "@/endpoints/AdminApiEndPoints";

export const useOrderService = () => {
  return useBaseService<Order, CreateOrderInput>(API_ENDPOINTS.ORDERS);
};
