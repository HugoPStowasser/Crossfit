import { httpDateToClient } from "../../../../utils/date";
import { TPaymentTypeHttp } from "../types";

export const mapperHttpToTable = (data: TPaymentTypeHttp[]) => {
  return data.map((paymentType, index) => {
    return {
      ...paymentType,
      index: index + 1,
      createdAt: httpDateToClient(paymentType.createdAt),
      updatedAt: httpDateToClient(paymentType.updatedAt),
    };
  });
};

export const mapperHttpToForm = (data: TPaymentTypeHttp) => {
  return {
    idPaymentType: data.idPaymentType,
    name: data.name,
    active: data.active,
  };
};
