export interface Table {
  id: number;
  table_number: number;
  capacity: number;
  status: "available" | "occupied";
  created_at?: string;
}

export interface CreateTableInput {
  table_number: number;
  capacity: number;
  status?: "available" | "occupied";
}