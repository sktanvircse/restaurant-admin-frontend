import { useStaffService } from "./staffs.service";
import { CreateStaffInput } from "./staffs.type";

export const useStaffActions = () => {
  const service = useStaffService();

  const getStaffs = async () => {
    const res = await service.findAll();
    return res.data;
  };

  const createStaff = async (data: CreateStaffInput) => {
    const res = await service.create(
      data as unknown as Record<string, unknown>,
    );
    return res.data;
  };

  const updateStaff = async (id: number, data: Partial<CreateStaffInput>) => {
    const res = await service.update(id, data);
    return res.data;
  };

  const deleteStaff = async (id: number) => {
    const res = await service.delete(id);
    return res.data;
  };

  return { getStaffs, createStaff, updateStaff, deleteStaff };
};
