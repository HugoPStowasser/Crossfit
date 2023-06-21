import { httpDateToClient } from "../../../../utils/date";
import { TStatusHttp } from "../types";

export const mapperHttpToTable = (data: TStatusHttp[]) => {
  return data.map((status, index) => {
    return {
      ...status,
      index: index + 1,
      createdAt: httpDateToClient(status.createdAt),
      updatedAt: httpDateToClient(status.updatedAt),
    };
  });
};

export const mapperHttpToForm = (data: TStatusHttp) => {
  return {
    idStatus: data.idStatus,
    name: data.name,
    normalizedName: data.normalizedName,
    active: data.active,
  };
};
