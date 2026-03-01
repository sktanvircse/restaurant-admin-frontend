// import { useBaseService } from "@/modules/core/base.service";
// import { Table, CreateTableInput } from "./tables.type";
// import { API_ENDPOINTS } from "@/endpoints/AdminApiEndPoints";

// export const useTableService = () => {
//   return useBaseService<Table, CreateTableInput>(API_ENDPOINTS.TABLES);
// };


// src/modules/admin/tables/tables.service.ts
"use client";

import { useBaseService } from "@/modules/core/base.service";
import { Table, CreateTableInput } from "./tables.type";

export const useTableService = () => {
  return useBaseService<Table, CreateTableInput>("/tables");
};