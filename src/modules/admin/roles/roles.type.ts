// src/modules/admin/roles/roles.type.ts
export interface Role {
  id: number;
  name: string;
  description?: string;
  status: boolean; // Backend uses status
  created_at?: string;
  updated_at?: string;
}

export interface CreateRoleInput {
  name: string;
  description?: string;
  status?: boolean;
}

export interface UpdateRoleInput {
  name?: string;
  description?: string;
  status?: boolean;
}
