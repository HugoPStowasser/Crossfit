import { httpDateToClient } from "../../../../utils/date";
import { TExerciseHttp } from "../types";

export const mapperHttpToTable = (data: TExerciseHttp[]) => {
  return data.map((exercise, index) => {
    return {
      ...exercise,
      index: index + 1,
      createdAt: httpDateToClient(exercise.createdAt),
      updatedAt: httpDateToClient(exercise.updatedAt),
    };
  });
};
export const mapperHttpToForm = (data: TExerciseHttp) => {
  return {
    idExercise: data.idExercise,
    description: data.description,
  };
};
