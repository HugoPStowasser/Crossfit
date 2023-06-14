export type TProfile = {
  id_profile: number;
  name: string;
  normalizedName: EProfile;
  active: Boolean;
};

export enum EProfile {
  student = "STUDENT",
  admin = "ADMIN",
  professor = "PROFESSOR",
}
