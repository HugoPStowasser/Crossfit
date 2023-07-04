import { api } from "../../../../services/http";
import { TClassData } from "../types";

export const useClassRequest = () => {
  const getAll = (idUser?: number) => {
    if (idUser) {
      return api.get(`/class/student-home/${idUser}`);
    }
    return api.get(`/class`);
  };

  const getById = (id: number) => {
    return api.get(`/class/${id}`);
  };

  const insert = (data: TClassData, idAdmin: number) => {
    return api.post(`/class/${idAdmin}`, data);
  };

  const deleteById = (id: number) => {
    return api.delete(`/class/${id}`);
  };

  const update = (data: TClassData) => {
    return api.put(`/class/${data.idClass}`, data);
  };

  return {
    getAll,
    getById,
    deleteById,
    update,
    insert,
  };
};
