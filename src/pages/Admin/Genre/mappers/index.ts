import { httpDateToClient } from "../../../../utils/date";
import { TGenderHttp } from "../types";

export const mapperHttpToTable = (data: TGenderHttp[]) => {
  return data.map((gender, index) => {
    return {
      ...gender,
      index: index + 1,
      createdAt: httpDateToClient(gender.createdAt),
      updatedAt: httpDateToClient(gender.updatedAt),
    };
  });
};

export const mapperHttpToForm = (data: TGenderHttp) => {
  return {
    idGender: data.idGender,
    name: data.name,
    normalizedName: data.normalizedName,
    active: data.active,
  };
};
