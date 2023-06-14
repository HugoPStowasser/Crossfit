import { api } from "../../../../services/http";

export const useExerciseRequest = () => {
  const getAll = () => {
    return api.get("/exercise");
  };
  const getById = (id: number) => {
    return api.get(`/exercise/${id}`);
  };
  const insert = ({ description }: { description: string }) => {
    return api.post("/exercise", { description });
  };
  const deleteById = (id: number) => {
    return api.delete(`/exercise/${id}`);
  };
  const update = ({
    description,
    idExercise,
  }: {
    description: string;
    idExercise: number;
  }) => {
    return api.put(`/exercise/${idExercise}`, { description });
  };

  return {
    getById,
    getAll,
    insert,
    update,
    deleteById,
  };
};
