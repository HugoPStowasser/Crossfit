import { TAdminHttp, TProfessorHttp, TUserHttp } from "../types";

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

export const mapperAdminHttpToForm = (data: TAdminHttp) => {
  return {
    idAdmin: data.idAdmin,
    name: data.name,
    socialName: data.socialName,
    email: data.email,
    password: "",
    confirmPassword: "",
  };
};
