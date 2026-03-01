"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY, AUTH_USER } from "@/lib/constants";
import { useAuthService } from "./users.service";
import { Admin, LoginInput, RegisterInput } from "./users.type";
import { Routes } from "@/config/routes";
import { toast } from "react-toastify";

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const router = useRouter();
  const authService = useAuthService();

  const login = async (credentials: LoginInput) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);

      if (response.success && response.data) {
        const { token, admin } = response.data;

        // Save token and user data
        Cookies.set(AUTH_TOKEN_KEY, token, { expires: 7 });
        localStorage.setItem(AUTH_USER, JSON.stringify(admin));

        setAdmin(admin);
        toast.success("Login successful!");
        router.push(Routes.dashboard);

        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterInput) => {
    setLoading(true);
    try {
      const response = await authService.register(data);

      if (response.success && response.data) {
        toast.success("Registration successful! Please login.");
        router.push(Routes.login);
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();

      // Clear auth data
      Cookies.remove(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER);

      setAdmin(null);
      toast.success("Logged out successfully");
      router.push(Routes.login);
    } catch (error: any) {
      toast.error("Logout failed");
    }
  };

  const loadUser = () => {
    try {
      const userStr = localStorage.getItem(AUTH_USER);
      const token = Cookies.get(AUTH_TOKEN_KEY);

      if (userStr && token) {
        const user = JSON.parse(userStr);
        setAdmin(user);
        return user;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const isAuthenticated = () => {
    const token = Cookies.get(AUTH_TOKEN_KEY);
    return !!token;
  };

  return {
    admin,
    loading,
    login,
    register,
    logout,
    loadUser,
    isAuthenticated,
  };
};
