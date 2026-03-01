// src/modules/admin/tables/tables.type.ts
export interface Table {
  id: number;
  table_no: string; // Backend uses table_no
  capacity: number;
  status: "available" | "occupied";
  created_at?: string;
  updated_at?: string;
}

export interface CreateTableInput {
  table_no: string; // Changed from table_number
  capacity: number;
  status?: "available" | "occupied";
}

export interface UpdateTableInput {
  table_no?: string;
  capacity?: number;
  status?: "available" | "occupied";
}
