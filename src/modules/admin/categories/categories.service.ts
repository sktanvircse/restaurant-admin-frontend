import { useBaseService } from "@/modules/core/base.service";
import { Category, CreateCategoryInput } from "./categories.type";
import { API_ENDPOINTS } from "@/endpoints/AdminApiEndPoints";

export const useCategoryService = () => {
  return useBaseService<Category, CreateCategoryInput>(
    API_ENDPOINTS.CATEGORIES,
  );
};
