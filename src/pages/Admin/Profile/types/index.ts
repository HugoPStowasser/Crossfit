export type TProfileHttp = {
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  idProfile: number;
  name: string;
  normalizedName: string;
  active: boolean;
};

export type TProfileData = {
  idProfile: number;
  name: string;
  normalizedName: string;
  active: boolean;
};

export type TProfileFormValues = {
  name: string;
};
