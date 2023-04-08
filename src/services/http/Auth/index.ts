import { api } from "..";

export const AuthService = () => {
  const login = () => {
    // TODO: Pass email and password to authenticate
    return api.get("/user");
  };

  return {
    login,
  };
};
