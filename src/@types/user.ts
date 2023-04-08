import { TProfile } from "./profile";

export type TUserApi = {
  id: Number;
  profile: TProfile;
  email: String;
  name: String;
  social_name: String;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

export type TStudentApi = TUserApi & {
  id_genre: Number;
  id_address: Number;
  birth_date: Date;
  is_blocked?: Boolean;
  block_description?: String;
  image_profile?: String;
};

export type TUserHttp = {
  id: Number;
  email: String;
  name: String;
  profile: TProfile;
};
