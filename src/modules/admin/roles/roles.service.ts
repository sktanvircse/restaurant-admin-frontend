// src/modules/admin/roles/roles.service.ts
"use client";

import { useBaseService } from "@/modules/core/base.service";
import { Role, CreateRoleInput } from "./roles.type";
import { API_ENDPOINTS } from "@/endpoints/AdminApiEndPoints";

export const useRoleService = () => {
  return useBaseService<Role, CreateRoleInput>(API_ENDPOINTS.ROLES);
};
