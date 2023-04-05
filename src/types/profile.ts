export type TProfile = {
  id_profile: Number;
  name: String;
  normalized_name: String;
  active: Boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

export enum EProfile {
  student = "Estudante",
  admin = "Administrador",
  professor = "Professor",
}
