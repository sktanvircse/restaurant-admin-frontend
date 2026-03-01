// src/modules/admin/roles/roles.service.ts
"use client";

import { useBaseService } from "@/modules/core/base.service";
import { Role, CreateRoleInput } from "./roles.type";

export const useRoleService = () => {
  return useBaseService<Role, CreateRoleInput>("/roles");
};
