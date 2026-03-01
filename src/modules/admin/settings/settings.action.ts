// src/modules/admin/settings/settings.action.ts
"use client";

import { toast } from "react-toastify";
import { useSettingsService } from "./settings.service";
import { Settings, UpdateSettingsInput } from "./settings.type";

export const useSettingsActions = () => {
  const service = useSettingsService();

  const getSettings = async (): Promise<Settings | null> => {
    try {
      const res = await service.getSettings();
      // Backend returns single object or empty object
      return Array.isArray(res.data) ? res.data[0] || null : res.data || null;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch settings");
      return null;
    }
  };

  const updateSettings = async (data: UpdateSettingsInput) => {
    try {
      const res = await service.updateSettings(data);
      toast.success("Settings updated successfully");
      return res.data;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update settings",
      );
      throw error;
    }
  };

  return {
    getSettings,
    updateSettings,
  };
};
