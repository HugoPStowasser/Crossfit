import { api } from "..";

export const AuthService = () => {
  const login = (email: string, password: string) => {
    return api.post("/user/login", {
      email,
      password,
    });
  };

  return {
    login,
  };
};
