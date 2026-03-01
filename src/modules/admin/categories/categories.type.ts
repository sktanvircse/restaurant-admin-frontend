// src/modules/admin/categories/categories.type.ts
export interface Category {
  id: number;
  name: string;
  status: number; // Backend uses status (1/0)
  is_active?: boolean; // Frontend uses is_active (true/false)
  created_at?: string;
  updated_at?: string;
}

export interface CreateCategoryInput {
  name: string;
  is_active?: boolean;
}

export interface UpdateCategoryInput {
  name?: string;
  is_active?: boolean;
}
