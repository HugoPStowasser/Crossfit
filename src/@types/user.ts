import { TProfile } from "./profile";

export type TUserApi = {
  idUser: number;
  profile: TProfile;
  email: string;
  name: string;
  socialName?: string;
};

export type TStudentApi = TUserApi & {
  idGender: number;
  idAddress?: number;
  birthDate: Date;
  isBlocked: Boolean;
  blockDescription?: string;
  // image_profile?: string;
};

export type TUserHttp = {
  idUser: number;
  email: string;
  name: string;
  profile: TProfile;
};
