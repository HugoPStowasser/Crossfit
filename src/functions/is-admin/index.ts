import { EProfile } from "../../@types/profile";

export const isAdminHandler = (normalizedName: string) =>
  EProfile.admin === normalizedName;
