export interface Food {
  id: number;
  name: string;
  price: number;
  category_id: number;
  is_available: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateFoodInput {
  name: string;
  price: number;
  category_id: number;
  is_available?: boolean;
}
