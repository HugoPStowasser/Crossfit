import { api } from "../../../../services/http";
import { TExerciseHttp } from "../types";

export const ExerciseService = () => {
  const getAll = () => {
    return api.get("/exercise");
  };
  const insert = ({ description }: { description: string }) => {
    return api.post("/exercise", { description });
  };

  return {
    getAll,
    insert,
  };
};
