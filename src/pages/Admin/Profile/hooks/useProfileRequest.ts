import { api } from "../../../../services/http";

export const useProfileRequest = () => {
  const getAll = () => {
    return api.get("/profile");
  };

  const getById = (id: number) => {
    return api.get(`/profile/${id}`);
  };

  const insert = ({ name }: { name: string }) => {
    return api.post("/profile", { name });
  };

  const deleteById = (id: number) => {
    return api.delete(`/profile/${id}`);
  };

  const update = ({
    name,
    idProfile,
  }: {
    name: string;
    idProfile: number;
  }) => {
    return api.put(`/profile/${idProfile}`, { name });
  };

  return {
    getById,
    getAll,
    insert,
    update,
    deleteById,
  };
};
