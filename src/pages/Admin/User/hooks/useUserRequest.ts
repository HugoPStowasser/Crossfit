import { api } from "../../../../services/http";

export const useUserRequest = () => {
  const getAll = () => {
    return api.get("/user");
  };

  return {
    getAll,
  };
};
