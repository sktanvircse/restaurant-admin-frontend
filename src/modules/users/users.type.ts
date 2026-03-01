export interface Admin {
  id: number;
  name: string;
  email: string;
  role: "admin" | "manager" | "staff";
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: "admin" | "manager" | "staff";
}

export interface AuthResponse {
  token: string;
  admin: Admin;
}

export interface LoginResponse {
  success: boolean;
  data: AuthResponse;
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  data: Admin;
  message?: string;
}
