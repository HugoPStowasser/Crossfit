import { TUserApi, TUserHttp } from "../@types/user";

export const UserApiToHttp = (user: TUserApi): TUserHttp => {
  return {
    id: user.id,
    email: user.email,
    name: user.social_name || user.name,
    profile: user.profile,
  };
};
