import { useRoleService } from "./roles.service";
import { CreateRoleInput } from "./roles.type";

export const useRoleActions = () => {
  const service = useRoleService();

  const getRoles = async () => {
    const res = await service.findAll();
    return res.data;
  };

  const createRole = async (data: CreateRoleInput) => {
    const res = await service.create(
      data as unknown as Record<string, unknown>,
    );
    return res.data;
  };

  const updateRole = async (id: number, data: Partial<CreateRoleInput>) => {
    const res = await service.update(id, data as Record<string, unknown>);
    return res.data;
  };

  const deleteRole = async (id: number) => {
    const res = await service.delete(id);
    return res.data;
  };

  return { getRoles, createRole, updateRole, deleteRole };
};
