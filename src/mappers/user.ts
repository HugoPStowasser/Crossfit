import { TUserApi, TUserHttp } from "../@types/user";

export const UserApiToHttp = (user: TUserApi): TUserHttp => {
  return {
    idUser: user.idUser,
    email: user.email,
    name: user.socialName || user.name,
    profile: user.profile,
  };
};
