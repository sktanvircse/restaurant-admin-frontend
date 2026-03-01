import { useTableService } from "./tables.schema";
import { CreateTableInput } from "./tables.type";

export const useTableActions = () => {
  const service = useTableService();

  return {
    getTables: async () => (await service.findAll()).data,
    createTable: async (data: CreateTableInput) =>
      (await service.create(data as unknown as Record<string, unknown>)).data,
    updateTable: async (id: number, data: Partial<CreateTableInput>) =>
      (await service.update(id, data as unknown as Record<string, unknown>))
        .data,
    deleteTable: async (id: number) => (await service.delete(id)).data,
  };
};
