import { api } from "../../../../services/http";
import {
  TAdminHttp,
  TAdminUpdateFormValues,
  TProfessorFormValues,
  TProfessorHttp,
  TStudentFormValues,
  TStudentHttp,
} from "../types";

export const useUserRequest = () => {
  const getAll = () => {
    return api.get("/user");
  };

  const insertProfessor = (data: TProfessorFormValues) => {
    return api.post("/professor", data);
  };

  const insertAdmin = (data: TAdminUpdateFormValues) => {
    return api.post("/admin", data);
  };

  const insertStudent = (data: TStudentFormValues) => {
    return api.post("/student", data);
  };

  const getProfessorById = (id: number) => {
    return api.get(`/user/professor/${id}`);
  };

  const getAdminById = (id: number) => {
    return api.get(`/user/admin/${id}`);
  };

  const getStudentById = (id: number) => {
    return api.get(`/user/student/${id}`);
  };

  const updateProfessor = ({
    name,
    socialName,
    idProfessor,
  }: TProfessorHttp) => {
    return api.put(`/professor/${idProfessor}`, { name, socialName });
  };

  const updateAdmin = (data: TAdminHttp) => {
    return api.put(`/admin/${data.idAdmin}`, data);
  };

  const updateStudent = (data: TStudentHttp) => {
    return api.put(`/student/${data.idStudent}`, data);
  };

  const deleteUserById = (id: number) => {
    return api.delete(`/user/${id}`);
  };

  return {
    getAll,
    getAdminById,
    getProfessorById,
    getStudentById,
    insertProfessor,
    insertAdmin,
    insertStudent,
    updateProfessor,
    updateAdmin,
    updateStudent,
    deleteUserById,
  };
};
