import { api } from "../../../../services/http";
import { TPaymentToHttp } from "../types";

export const usePaymentRequest = () => {
  const getAll = () => {
    return api.get("/payment");
  };
  const getById = (id: number) => {
    return api.get(`/payment/${id}`);
  };
  const update = (data: TPaymentToHttp) => {
    return api.put(`/payment/${data.idPayment}`, data);
  };

  return {
    getById,
    getAll,
    update,
  };
};
