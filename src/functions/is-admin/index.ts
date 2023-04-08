import { EProfile } from "../../@types/profile";

export const isAdminHandler = (normalizedName: String) =>
  EProfile.admin === normalizedName;
