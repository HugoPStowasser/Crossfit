import { TProfessorHttp, TUserHttp } from "../types";

export const mapperHttpToTable = (data: TUserHttp[]) => {
  return data.map((user, index) => {
    return {
      ...user,
      index: index + 1,
      profile: user.profile.name,
    };
  });
};

export const mapperProfessorHttpToForm = (data: TProfessorHttp) => {
  return {
    idProfessor: data.idProfessor,
    name: data.name,
    socialName: data.socialName,
  };
};
