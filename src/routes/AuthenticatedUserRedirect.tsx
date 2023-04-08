import { Navigate, Outlet } from "react-router-dom";
import { redirectUserAuthenticatedHandler } from "../functions";

export const AuthenticatedUserRedirect = () => {
  // TODO: Valid if user is already authenticated
  const user = JSON.parse(sessionStorage.getItem(`@User:1`) || "{}");
  console.log("user");

  if (!!user?.id) {
    const path = redirectUserAuthenticatedHandler({ user });
    return <Navigate to={path} />;
  }

  return <Outlet />;
};
