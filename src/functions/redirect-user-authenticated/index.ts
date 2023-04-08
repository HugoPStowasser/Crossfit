import { isAdminHandler } from "../is-admin";

type TRedirectUserAuthenticatedHandler = {
  user: {
    profile: {
      normalized_name: String;
    };
  };
};

export const redirectUserAuthenticatedHandler = ({
  user,
}: TRedirectUserAuthenticatedHandler) => {
  const isAdmin = isAdminHandler(user.profile.normalized_name);
  if (isAdmin) {
    return "/admin/dashboard";
  }
  return "/student/home";
};
