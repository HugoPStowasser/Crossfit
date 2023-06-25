import { api } from "../../../../services/http";
import { TStudentPointsData } from "../types";

export const useStudentPointsRequest = () => {
  const getAll = () => {
    return api.get("/class");
  };

  const getAllExercises = () => {
    return api.get("/exercises");
  };

  const getById = (idStudent: number, idExercise: number) => {
    return api.get(`/class/${idStudent}/${idExercise}`);
  };

  const insert = (data: TStudentPointsData) => {
    return api.post(`/class`, data);
  };

  const deleteById = (idStudent: number, idExercise: number) => {
    return api.delete(`/class/${idStudent}/${idExercise}`);
  };

  const update = (idStudent: number, idExercise: number) => {
    return api.put(`/class/${idStudent}/${idExercise}`);
  };

  return {
    getAll,
    getAllExercises,
    getById,
    insert,
    deleteById,
    update
  };
};
