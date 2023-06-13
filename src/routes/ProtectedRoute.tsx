import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

export const ProtectedRoute = ({ redirectPath = "/login" }) => {
  // TODO: Take the token
  // TODO: Validate token in backend
  // TODO: IF TRUE Renew Token and Authorize the user
  // TODO: IF FALSE redirect the user to login
  const user = JSON.parse(localStorage.getItem(`@User`) || "{}");
  if (!user.idUser) {
    return <Navigate to={redirectPath} replace />;
  } else {
    const token = localStorage.getItem(`@Token${user.idUser}`) || "";
    console.log(token);
    useCurrentUser;
  }

  return <Outlet />;
};
