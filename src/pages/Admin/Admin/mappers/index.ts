import { httpDateToClient } from "../../../../utils/date";
import { TAdminHttp } from "../types";

export const mapperHttpToTable = (data: TAdminHttp[]) => {
  return data.map((admin, index) => {
    return {
      ...admin,
      index: index + 1,
      createdAt: httpDateToClient(admin.createdAt),
      updatedAt: httpDateToClient(admin.updatedAt),
    };
  });
};

export const mapperHttpToForm = (data: TAdminHttp) => {
  return {
    idAdmin: data.idAdmin,
    idUser: data.idUser,
    description: data.description
  };
};
