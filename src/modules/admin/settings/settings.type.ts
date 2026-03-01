// src/modules/admin/settings/settings.type.ts
export interface Settings {
  id?: number;
  restaurant_name: string;
  tax_percentage: number;
  opening_time: string;
  closing_time: string;
  created_at?: string;
  updated_at?: string;
}

export interface UpdateSettingsInput {
  restaurant_name: string;
  tax_percentage: number;
  opening_time: string;
  closing_time: string;
}
