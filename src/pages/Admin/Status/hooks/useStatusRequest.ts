import { api } from "../../../../services/http";

export const useStatusRequest = () => {
  const getAll = () => {
    return api.get("/status");
  };

  const getById = (id: number) => {
    return api.get(`/status/${id}`);
  };

  const insert = ({ name }: { name: string }) => {
    return api.post("/status", { name });
  };

  const deleteById = (id: number) => {
    return api.delete(`/status/${id}`);
  };

  const update = ({
    name,
    idStatus,
  }: {
    name: string;
    idStatus: number;
  }) => {
    return api.put(`/status/${idStatus}`, { name });
  };

  return {
    getById,
    getAll,
    insert,
    update,
    deleteById,
  };
};
