import { Route, Routes } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { Login, SignUp } from "../pages/Auth";
import { Dashboard } from "../pages/Admin";
import { Home } from "../pages/Student/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthenticatedUserRedirect } from "./AuthenticatedUserRedirect";
import { RegisterPoints } from "../pages/Student/RegisterPoints";
import { Exercise, CreateExercise } from "../pages/Admin/Exercise";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="" element={<AuthenticatedUserRedirect />}>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
      <Route path="admin" element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="exercise" element={<Exercise />} />
        <Route path="exercise/create" element={<CreateExercise />} />
      </Route>
      <Route path="student" element={<ProtectedRoute />}>
        <Route path="home" element={<Home />} />
        <Route path="register-points" element={<RegisterPoints />} />
      </Route>
      <Route path="landing-page" element={<LandingPage />} />
    </Routes>
  );
};
