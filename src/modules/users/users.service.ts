"use client";

import { API_ENDPOINTS } from "@/endpoints/AdminApiEndPoints";
import { useBaseService } from "../core/base.service";
import {
  Admin,
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
} from "./users.type";

export const useAuthService = () => {
  const baseService = useBaseService<Admin>(API_ENDPOINTS.AUTH.LOGIN);

  const login = async (credentials: LoginInput) => {
    const response = await baseService
      .getAxiosInstance()
      .post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  };

  const register = async (data: RegisterInput) => {
    const response = await baseService
      .getAxiosInstance()
      .post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  };

  const logout = async () => {
    const response = await baseService
      .getAxiosInstance()
      .post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  };

  const getCurrentUser = async () => {
    const response = await baseService
      .getAxiosInstance()
      .get<{ success: boolean; data: Admin }>(API_ENDPOINTS.AUTH.ME);
    return response.data;
  };

  return {
    login,
    register,
    logout,
    getCurrentUser,
  };
};
