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
  name: string;
  socialName: string;
};

export type TProfessorData = {
  idProfessor: number;
  name: string;
  socialName?: string;
};

export type TProfessorFormValues = Omit<TProfessorData, "idProfessor">;

export type TAdminHttp = {
  idAdmin: number;
  name: string;
  socialName: string;
  email: string;
  password: string;
};

export type TAdminData = {
  idAdmin: number;
  name: string;
  socialName?: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type TAdminFormValues = Omit<TAdminData, "idAdmin">;
export type TAdminUpdateFormValues = Omit<
  TAdminData,
  "idAdmin" | "confirmPassword"
>;
