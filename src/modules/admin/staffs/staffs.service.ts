// src/modules/admin/staffs/staffs.service.ts
"use client";

import { useBaseService } from "@/modules/core/base.service";
import { Staff, CreateStaffInput } from "./staffs.type";

export const useStaffService = () => {
  return useBaseService<Staff, CreateStaffInput>("/staffs");
};
