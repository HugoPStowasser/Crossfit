import { TProfile } from "./profile";

export type TUserApi = {
  idUser: Number;
  profile: TProfile;
  email: string;
  name: string;
  socialName?: string;
};

export type TStudentApi = TUserApi & {
  idGenre: Number;
  idAddress?: Number;
  birthDate: Date;
  isBlocked: Boolean;
  blockDescription?: string;
  // image_profile?: string;
};

export type TUserHttp = {
  idUser: Number;
  email: string;
  name: string;
  profile: TProfile;
};
