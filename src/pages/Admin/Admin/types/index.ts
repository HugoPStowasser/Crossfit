export type TAdminHttp = {
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  idAdmin: number;
  idUser: number;
  description: string;
};

export type TAdminData = {
  idAdmin: number;
  idUser: number;
  description: string;
};

export type TAdminFormValues = {
  idUser: number;
  description: string;
};
