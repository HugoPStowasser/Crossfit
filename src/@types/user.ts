import { TProfile } from "./profile";

export type TUserApi = {
  idUser: Number;
  profile: TProfile;
  email: String;
  name: String;
  socialName?: String;
};

export type TStudentApi = TUserApi & {
  idGenre: Number;
  idAddress?: Number;
  birthDate: Date;
  isBlocked: Boolean;
  blockDescription?: String;
  // image_profile?: String;
};

export type TUserHttp = {
  idUser: Number;
  email: String;
  name: String;
  profile: TProfile;
};
