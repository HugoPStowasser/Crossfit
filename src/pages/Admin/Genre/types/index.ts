export type TGenderHttp = {
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    idGender: number;
    name: string;
    normalizedName: string;
    active: boolean;
  };
  
  export type TGenderData = {
    idGender: number;
    name: string;
    normalizedName: string;
    active: boolean;
  };
  
  export type TGenderFormValues = {
    name: string;
  };