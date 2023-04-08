import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ redirectPath = "/login" }) => {
  // TODO: Take the token
  // TODO: Validate token in backend
  // TODO: IF TRUE Renew Token and Authorize the user
  // TODO: IF FALSE redirect the user to login
  const user = sessionStorage.getItem(`@User:1`);

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
