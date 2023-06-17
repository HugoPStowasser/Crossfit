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
