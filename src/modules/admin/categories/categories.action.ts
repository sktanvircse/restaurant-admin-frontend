import { useCategoryService } from "./categories.service";
import { CreateCategoryInput } from "./categories.type";

export const useCategoryActions = () => {
  const service = useCategoryService();

  const getCategories = async () => {
    const res = await service.findAll();
    return res.data;
  };

  const createCategory = async (data: CreateCategoryInput) => {
    const res = await service.create(
      data as unknown as Record<string, unknown>,
    );
    return res.data;
  };

  const updateCategory = async (
    id: number,
    data: Partial<CreateCategoryInput>,
  ) => {
    const res = await service.update(id, data);
    return res.data;
  };

  const deleteCategory = async (id: number) => {
    const res = await service.delete(id);
    return res.data;
  };

  return { getCategories, createCategory, updateCategory, deleteCategory };
};
