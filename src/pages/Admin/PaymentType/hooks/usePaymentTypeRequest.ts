import { api } from "../../../../services/http";

export const usePaymentTypeRequest = () => {
  const getAll = () => {
    return api.get("/paymentType");
  };

  const getById = (id: number) => {
    return api.get(`/paymentType/${id}`);
  };

  const insert = ({ name }: { name: string }) => {
    return api.post("/paymentType", { name });
  };

  const deleteById = (id: number) => {
    return api.delete(`/paymentType/${id}`);
  };

  const update = ({
    name,
    idPaymentType,
  }: {
    name: string;
    idPaymentType: number;
  }) => {
    return api.put(`/paymentType/${idPaymentType}`, { name });
  };

  return {
    getById,
    getAll,
    insert,
    update,
    deleteById,
  };
};
