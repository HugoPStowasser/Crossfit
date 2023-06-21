type THttpUserBase = {
  name: string;
  socialName: string;
  email: string;
  password: string;
};
type TUserDataBase = {
  name: string;
  socialName?: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type TUserHttp = {
  idUser: number;
  idProfile: number;
  email: string;
  name: string;
  socialName: string;
  profile: {
    idProfile: 1;
    name: string;
    normalizedName: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

export type TProfessorHttp = {
  idProfessor: number;
} & Omit<THttpUserBase, "email" | "password">;

export type TProfessorData = {
  idProfessor: number;
} & Omit<TUserDataBase, "email" | "password" | "confirmPassword">;

export type TProfessorFormValues = Omit<TProfessorData, "idProfessor">;

export type TAdminHttp = {
  idAdmin: number;
} & THttpUserBase;

export type TAdminData = {
  idAdmin: number;
} & TUserDataBase;

export type TAdminFormValues = Omit<TAdminData, "idAdmin">;
export type TAdminUpdateFormValues = Omit<
  TAdminData,
  "idAdmin" | "confirmPassword"
>;

export type TStudentHttp = {
  idStudent: number;
  birthDate: string;
  idGender: number;
} & THttpUserBase;

export type TStudentData = {
  idStudent: number;
  birthDate: string;
  idGender: number;
} & TUserDataBase;

export type TStudentFormValues = {
  birthDate: string;
  gender: string;
} & Omit<TStudentData, "idStudent">;
export type TStudentUpdateFormValues = Omit<
  TStudentData,
  "idStudent" | "confirmPassword"
>;
