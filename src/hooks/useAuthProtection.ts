// src/hooks/useAuthProtection.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY, AUTH_USER } from "@/lib/constants";
import { Routes } from "@/config/routes";

export const useAuthProtection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get(AUTH_TOKEN_KEY);
      const userStr = localStorage.getItem(AUTH_USER);

      if (!token || !userStr) {
        // Not authenticated, redirect to login
        router.push(Routes.login);
        setIsAuthenticated(false);
      } else {
        // Authenticated
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  return { isLoading, isAuthenticated };
};
