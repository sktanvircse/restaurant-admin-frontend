// src/modules/admin/staffs/staffs.type.ts
export interface Staff {
  id: number;
  name: string;
  phone: string;
  role_id: number;
  role_name?: string; // From JOIN in backend
  status: boolean; // Backend uses status, not is_active
  created_at?: string;
  updated_at?: string;
}

export interface CreateStaffInput {
  name: string;
  phone: string;
  role_id: number;
  status?: boolean;
}

export interface UpdateStaffInput {
  name?: string;
  phone?: string;
  role_id?: number;
  status?: boolean;
}

// Role type for dropdown
export interface Role {
  id: number;
  name: string;
}
