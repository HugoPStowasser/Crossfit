import { api } from "..";

export const AuthService = () => {
  const login = (email: String, password: String) => {
    return api.post("/user/login", {
      email,
      password,
    });
  };

  return {
    login,
  };
};
