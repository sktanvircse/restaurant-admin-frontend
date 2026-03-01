// src/modules/admin/settings/settings.service.ts
"use client";

import { useBaseService } from "@/modules/core/base.service";
import { Settings, UpdateSettingsInput } from "./settings.type";
import { API_ENDPOINTS } from "@/endpoints/AdminApiEndPoints";

export const useSettingsService = () => {
  const baseService = useBaseService<Settings, UpdateSettingsInput>(
    API_ENDPOINTS.SETTINGS,
  );

  return {
    getSettings: () => baseService.findAll(),
    updateSettings: (data: UpdateSettingsInput) =>
      baseService.create(data as unknown as Record<string, unknown>), // Backend uses same endpoint for create/update
  };
};
