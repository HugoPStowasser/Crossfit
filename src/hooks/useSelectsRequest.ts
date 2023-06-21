import { api } from "../services/http";

export const useGenderRequest = () => {
  const getAll = () => {
    return api.get("/gender");
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

export const useProfessorsRequest = () => {
  const getAll = () => {
    return api.get("/professor");
  };

  return {
    getAll,
  };
};
