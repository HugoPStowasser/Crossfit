import { httpDateToClient } from "../../../../utils/date";
import { TProfileHttp } from "../types";

export const mapperHttpToTable = (data: TProfileHttp[]) => {
  return data.map((profile, index) => {
    return {
      ...profile,
      index: index + 1,
      createdAt: httpDateToClient(profile.createdAt),
      updatedAt: httpDateToClient(profile.updatedAt),
    };
  });
};

export const mapperHttpToForm = (data: TProfileHttp) => {
  return {
    idProfile: data.idProfile,
    name: data.name,
    normalizedName: data.normalizedName,
    active: data.active,
  };
};
