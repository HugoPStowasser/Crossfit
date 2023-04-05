import { TProfile } from "./profile";

export interface IUserApi {
  id: Number;
  profile: TProfile;
  email: String;
  name: String;
  social_name: String;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface IStudentApi extends IUserApi {
  id_genre: Number;
  id_address: Number;
  birth_date: Date;
  is_blocked?: Boolean;
  block_description?: String;
  image_profile?: String;
}

export type TUserHttp = {
  id: Number;
  email: String;
  name: String;
  profile: TProfile;
};
