export type TProfile = {
  id_profile: Number;
  name: String;
  normalizedName: EProfile;
  active: Boolean;
};

export enum EProfile {
  student = "STUDENT",
  admin = "ADMIN",
  professor = "PROFESSOR",
}
