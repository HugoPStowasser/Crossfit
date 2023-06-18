export type TGenreHttp = {
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    idGenre: number;
    name: string;
    normalizedName: string;
    active: boolean;
  };
  
  export type TGenreData = {
    idGenre: number;
    name: string;
    normalizedName: string;
    active: boolean;
  };
  
  export type TGenreFormValues = {
    name: string;
  };