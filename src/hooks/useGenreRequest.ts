import { api } from "../services/http";

export const useGenreRequest = () => {
  const getAll = () => {
    return api.get("/genre");
  };

  return {
    getAll,
  };
};
