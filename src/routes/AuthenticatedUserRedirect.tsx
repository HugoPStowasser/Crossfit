import { Navigate, Outlet } from "react-router-dom";
import { redirectUserAuthenticatedHandler } from "../functions";

export const AuthenticatedUserRedirect = () => {
  // TODO: Valid if user is already authenticated
  const { normalizedName } = JSON.parse(
    sessionStorage.getItem(`@User`) || "{}"
  );

  if (!!normalizedName) {
    const path = redirectUserAuthenticatedHandler({ normalizedName });
    return <Navigate to={path} />;
  }

  return <Outlet />;
};
