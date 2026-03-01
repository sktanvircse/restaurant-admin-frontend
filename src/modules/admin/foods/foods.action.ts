import { useFoodService } from "./foods.service";
import { CreateFoodInput } from "./foods.type";

export const useFoodActions = () => {
  const service = useFoodService();

  const getFoods = async () => {
    const res = await service.findAll();
    return res.data;
  };

  const createFood = async (data: CreateFoodInput) => {
    const res = await service.create(
      data as unknown as Record<string, unknown>,
    );
    return res.data;
  };

  const updateFood = async (id: number, data: Partial<CreateFoodInput>) => {
    const res = await service.update(id, data);
    return res.data;
  };

  const deleteFood = async (id: number) => {
    const res = await service.delete(id);
    return res.data;
  };

  return {
    getFoods,
    createFood,
    updateFood,
    deleteFood,
  };
};
