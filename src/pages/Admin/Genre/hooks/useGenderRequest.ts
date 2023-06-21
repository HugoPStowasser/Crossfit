import { api } from "../../../../services/http";

export const useGenderRequest = () => {
  const getAll = () => {
    return api.get("/gender");
  };

  const getById = (id: number) => {
    return api.get(`/gender/${id}`);
  };

  const insert = ({ name }: { name: string }) => {
    return api.post("/gender", { name });
  };

  const deleteById = (id: number) => {
    return api.delete(`/gender/${id}`);
  };

  const update = ({
    name,
    idGender,
  }: {
    name: string;
    idGender: number;
  }) => {
    return api.put(`/gender/${idGender}`, { name });
  };

  return {
    getById,
    getAll,
    insert,
    update,
    deleteById,
  };
};
