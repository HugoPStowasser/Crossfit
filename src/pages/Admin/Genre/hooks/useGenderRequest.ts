import { api } from "../../../../services/http";

export const useGenreRequest = () => {
  const getAll = () => {
    return api.get("/genre");
  };

  const getById = (id: number) => {
    return api.get(`/genre/${id}`);
  };

  const insert = ({ name }: { name: string }) => {
    return api.post("/genre", { name });
  };

  const deleteById = (id: number) => {
    return api.delete(`/genre/${id}`);
  };

  const update = ({
    name,
    idGenre,
  }: {
    name: string;
    idGenre: number;
  }) => {
    return api.put(`/genre/${idGenre}`, { name });
  };

  return {
    getById,
    getAll,
    insert,
    update,
    deleteById,
  };
};
