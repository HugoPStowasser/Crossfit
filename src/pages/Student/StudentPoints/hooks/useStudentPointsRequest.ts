import { api } from "../../../../services/http";
import { TStudentPointsData } from "../types";

export const useStudentPointsRequest = () => {
  const getAll = () => {
    return api.get("/studentPoints");
  };

  const getById = (idStudent: number, idExercise: number) => {
    return api.get(`/studentPoints/${idStudent}/${idExercise}`);
  };

  const insert = (data: TStudentPointsData) => {
    return api.post(`/studentPoints`, data);
  };

  const deleteById = (idStudent: number, idExercise: number) => {
    return api.delete(`/studentPoints/${idStudent}/${idExercise}`);
  };

  const update = (idStudent: number, idExercise: number) => {
    return api.put(`/studentPoints/${idStudent}/${idExercise}`);
  };

  return {
    getAll,
    getById,
    insert,
    deleteById,
    update
  };
};
