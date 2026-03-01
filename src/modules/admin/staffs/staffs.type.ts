export interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  role_id: number;
  is_active: boolean;
  created_at?: string;
}

export interface CreateStaffInput {
  name: string;
  email: string;
  phone: string;
  role_id: number;
  is_active?: boolean;
}