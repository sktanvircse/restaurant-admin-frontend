export interface Category {
  id: number;
  name: string;
  is_active: boolean;
  created_at?: string;
}

export interface CreateCategoryInput {
  name: string;
  is_active?: boolean;
}
