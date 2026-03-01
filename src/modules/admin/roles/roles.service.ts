// src/modules/admin/roles/roles.service.ts
"use client";

import { useBaseService } from "@/modules/core/base.service";

interface Role {
  id: number;
  name: string;
}

export const useRoleService = () => {
  return useBaseService<Role>("/roles");
};
