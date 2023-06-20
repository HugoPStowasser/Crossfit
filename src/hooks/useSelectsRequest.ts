import { api } from "../services/http";

export const useGenreRequest = () => {
  const getAll = () => {
    return api.get("/genre");
  };

  return {
    getAll,
  };
};

export const usePaymentTypeRequest = () => {
  const getAll = () => {
    return api.get("/paymentType");
  };

  return {
    getAll,
  };
};
