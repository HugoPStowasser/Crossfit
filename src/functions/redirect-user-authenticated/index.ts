import { isAdminHandler } from "../is-admin";

type TRedirectUserAuthenticatedHandler = { normalizedName: String };

export const redirectUserAuthenticatedHandler = ({
  normalizedName,
}: TRedirectUserAuthenticatedHandler) => {
  const isAdmin = isAdminHandler(normalizedName);
  console.log("isAdmin", isAdmin);
  if (isAdmin) {
    return "/admin/dashboard";
  }
  return "/student/home";
};
