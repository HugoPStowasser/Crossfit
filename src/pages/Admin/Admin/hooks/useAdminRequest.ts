import { api } from "../../../../services/http";

export const useAdminRequest = () => {
  const getAll = () => {
    return api.get("/admin");
  };
  const getById = (id: number) => {
    return api.get(`/admin/${id}`);
  };
  const insert = ({ description }: { description: string }) => {
    return api.post("/admin", { description });
  };
  const deleteById = (id: number) => {
    return api.delete(`/admin/${id}`);
  };
  const update = ({
    description,
    idAdmin,
  }: {
    description: string;
    idAdmin: number;
  }) => {
    return api.put(`/admin/${idAdmin}`, { description });
  };

  return {
    getById,
    getAll,
    insert,
    update,
    deleteById,
  };
};
