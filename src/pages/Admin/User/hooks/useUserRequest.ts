import { api } from "../../../../services/http";
import { TProfessorFormValues, TProfessorHttp } from "../types";

export const useUserRequest = () => {
  const getAll = () => {
    return api.get("/user");
  };

  const insertProfessor = (data: TProfessorFormValues) => {
    return api.post("/professor", data);
  };

  const getProfessorById = (id: number) => {
    return api.get(`/user/professor/${id}`);
  };

  const updateProfessor = ({
    name,
    socialName,
    idProfessor,
  }: TProfessorHttp) => {
    return api.put(`/professor/${idProfessor}`, { name, socialName });
  };

  const deleteUserById = (id: number) => {
    return api.delete(`/user/${id}`);
  };

  return {
    getAll,
    insertProfessor,
    getProfessorById,
    updateProfessor,
    deleteUserById,
  };
};
