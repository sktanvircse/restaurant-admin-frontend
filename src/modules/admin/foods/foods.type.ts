// src/modules/admin/foods/foods.type.ts
export interface Food {
  id: number;
  name: string;
  price: number;
  category_id: number;
  category_name?: string; // From JOIN in backend
  image?: string;
  is_available: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateFoodInput {
  name: string;
  price: number;
  category_id: number;
  image?: string;
  is_available?: boolean;
}

export interface UpdateFoodInput {
  name?: string;
  price?: number;
  category_id?: number;
  image?: string;
  is_available?: boolean;
}
