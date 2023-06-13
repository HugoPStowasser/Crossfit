import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import { EProfile } from "../@types/profile";

export const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const location = useLocation();
  const token = localStorage.getItem("@Token") || "";
  const user = JSON.parse(localStorage.getItem("@User") || "{}");
  // TODO: Take the token
  // TODO: Validate token in backend

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  } else {
    const { pathname } = location;
    const tokenObject = JSON.parse(atob(token.split(".")[1]));
    if (pathname.includes("student") && tokenObject.role === EProfile.admin) {
      return <Navigate to={"/admin/dashboard"} replace />;
    } else if (
      pathname.includes("admin") &&
      tokenObject.role === EProfile.student
    ) {
      return <Navigate to={"/student/home"} replace />;
    }
  }

  return (
    <Box minH="100vh" fontFamily={"Inter"}>
      <Navbar />
      <Outlet />
    </Box>
  );
};
