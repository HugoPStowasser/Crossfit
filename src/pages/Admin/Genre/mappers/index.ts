import { httpDateToClient } from "../../../../utils/date";
import { TGenreHttp } from "../types";

export const mapperHttpToTable = (data: TGenreHttp[]) => {
  return data.map((genre, index) => {
    return {
      ...genre,
      index: index + 1,
      createdAt: httpDateToClient(genre.createdAt),
      updatedAt: httpDateToClient(genre.updatedAt),
    };
  });
};

export const mapperHttpToForm = (data: TGenreHttp) => {
  return {
    idGenre: data.idGenre,
    name: data.name,
    normalizedName: data.normalizedName,
    active: data.active,
  };
};
