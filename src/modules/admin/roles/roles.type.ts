export interface Role {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
}

export interface CreateRoleInput {
  name: string;
  description?: string;
}