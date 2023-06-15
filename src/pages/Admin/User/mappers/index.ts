import { TUserHttp } from "../types";

export const mapperHttpToTable = (data: TUserHttp[]) => {
  return data.map((user, index) => {
    console.log({
      ...user,
      index: index + 1,
      profile: user.profile.name,
    });
    return {
      ...user,
      index: index + 1,
      profile: user.profile.name,
    };
  });
};
