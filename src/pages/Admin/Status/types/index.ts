export type TStatusHttp = {
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    idStatus: number;
    name: string;
    normalizedName: string;
    active: boolean;
  };
  
  export type TStatusData = {
    idStatus: number;
    name: string;
    normalizedName: string;
    active: boolean;
  };
  
  export type TStatusFormValues = {
    name: string;
  };
  