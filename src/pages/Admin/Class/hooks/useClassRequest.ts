import { api } from "../../../../services/http";

export const useClassRequest = () => {
  const getAll = () => {
    return api.get("/class");
  };

  const deleteById = (id: number) => {
    return api.delete(`/class/${id}`);
  };

  return {
    getAll,
    deleteById,
  };
};
