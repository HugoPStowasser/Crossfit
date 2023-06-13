import { Navigate, Outlet } from "react-router-dom";
import { redirectUserAuthenticatedHandler } from "../functions";
import { TUserHttp } from "../@types/user";

export const AuthenticatedUserRedirect = () => {
  // TODO: Valid if user is already authenticated
  const user: TUserHttp = JSON.parse(localStorage.getItem(`@User`) || "{}");
  if (!!user?.profile?.normalizedName) {
    const path = redirectUserAuthenticatedHandler({
      normalizedName: user.profile.normalizedName,
    });
    return <Navigate to={path} />;
  }

  return <Outlet />;
};
