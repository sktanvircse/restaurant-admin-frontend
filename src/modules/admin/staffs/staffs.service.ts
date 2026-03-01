import { useBaseService } from "@/modules/core/base.service";
import { Staff, CreateStaffInput } from "./staffs.type";
import { API_ENDPOINTS } from "@/endpoints/AdminApiEndPoints";

export const useStaffService = () => {
  return useBaseService<Staff, CreateStaffInput>(API_ENDPOINTS.STAFFS);
};
