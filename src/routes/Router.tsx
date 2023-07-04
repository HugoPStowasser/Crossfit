import { Route, Routes } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { Login, SignUp } from "../pages/Auth";
import { Dashboard } from "../pages/Admin";
import { Home } from "../pages/Student/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthenticatedUserRedirect } from "./AuthenticatedUserRedirect";
import { RegisterPoints } from "../pages/Student/RegisterPoints";
import { Exercise, CreateExercise } from "../pages/Admin/Exercise";
import { NotFound } from "../pages/Errors/NotFound";
import { User } from "../pages/Admin/User";
import { CreateProfessor } from "../pages/Admin/User/Form/CreateProfessor";
import { CreateAdmin } from "../pages/Admin/User/Form/CreateAdmin";
import { CreateStudent } from "../pages/Admin/User/Form/CreateStudent";
import { Payment } from "../pages/Admin/Payment";
import { CreatePayment } from "../pages/Admin/Payment/form/CreatePayment";
import { Class } from "../pages/Admin/Class/Class";
import { CreateClass } from "../pages/Admin/Class/form/CreateClass";
import { Gender } from "../pages/Admin/Gender/Gender";
import { CreateGender } from "../pages/Admin/Gender/Form/CreateGender";
import { CreateStatus } from "../pages/Admin/Status/Form/CreateStatus";
import { Status } from "../pages/Admin/Status/Status";
import { CreateProfile } from "../pages/Admin/Profile/Form/CreateProfile";
import { Profile } from "../pages/Admin/Profile/Profile";
import { PaymentType } from "../pages/Admin/PaymentType/PaymentType";
import { CreatePaymentType } from "../pages/Admin/PaymentType/Form/CreatePaymentType";
import { StudentPayments } from "../pages/Student/Payments";
import { EditStudentProfile } from "../pages/Student/Profile";

export const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route index element={<LandingPage />} />
      <Route path="" element={<AuthenticatedUserRedirect />}>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
      <Route path="admin" element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="exercise" element={<Exercise />} />
        <Route path="class" element={<Class />} />
        <Route path="class/create/:idClass?" element={<CreateClass />} />
        <Route path="gender" element={<Gender />} />
        <Route path="gender/create/:idGender?" element={<CreateGender />} />
        <Route path="status" element={<Status />} />
        <Route path="status/create/:idStatus?" element={<CreateStatus />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/create/:idProfile?" element={<CreateProfile />} />
        <Route path="payment" element={<Payment />} />
        <Route path="payment/create/:idPayment" element={<CreatePayment />} />
        <Route path="paymentType" element={<PaymentType />} />
        <Route
          path="paymentType/create/:idPaymentType?"
          element={<CreatePaymentType />}
        />
        <Route
          path="exercise/create/:idExercise?"
          element={<CreateExercise />}
        />
        <Route path="user" element={<User />} />
        <Route
          path="user/professor/create/:idProfessor?"
          element={<CreateProfessor />}
        />
        <Route path="user/admin/create/:idAdmin?" element={<CreateAdmin />} />
        <Route
          path="user/student/create/:idStudent?"
          element={<CreateStudent />}
        />
      </Route>
      <Route path="student" element={<ProtectedRoute />}>
        <Route path="home" element={<Home />} />
        <Route path="register-points" element={<RegisterPoints />} />
        <Route path="invoices" element={<StudentPayments />} />
        <Route path="profile" element={<EditStudentProfile />} />
      </Route>
      <Route path="landing-page" element={<LandingPage />} />
    </Routes>
  );
};
