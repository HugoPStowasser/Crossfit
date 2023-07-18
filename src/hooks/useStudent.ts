import { useState } from "react";
import { api } from "../services/http";
import { useCurrentUser } from "./useCurrentUser";
import { useCustomToast } from "./useCustomToast";
import { useUserRequest } from "../pages/Admin/User/hooks/useUserRequest";

const useStudentRequest = () => {
  const checkInClass = (idStudent: number, idClass: number) => {
    return api.post(`/student/checkIn/${idStudent}/${idClass}`);
  };
  const checkoutClass = (idStudent: number, idClass: number) => {
    return api.delete(`/student/checkout/${idStudent}/${idClass}`);
  };

  return {
    checkInClass,
    checkoutClass,
  };
};

export const useStudent = () => {
  const [isLoading, setIsloading] = useState(false);
  const { errorToast, successToast } = useCustomToast();
  const apiStudent = useStudentRequest();
  const apiUser = useUserRequest();
  const { currentUser } = useCurrentUser();

  const checkIn = async (idClass: number) => {
    let result = true;
    try {
      setIsloading(true);
      const { data }: { data: { idStudent: number } } =
        await apiUser.getStudentByUserId(currentUser.idUser);
      await apiStudent.checkInClass(data.idStudent, idClass);
      successToast({
        title: "Check-in realizado com sucesso, não se atrase!",
      });
    } catch (error) {
      result = false;
      errorToast({
        title: `Não foi possível realizar o checkIn para esta aula.`,
      });
    } finally {
      setIsloading(false);
    }
    return result;
  };

  const checkout = async (idClass: number) => {
    let result = true;
    try {
      setIsloading(true);
      const { data }: { data: { idStudent: number } } =
        await apiUser.getStudentByUserId(currentUser.idUser);
      await apiStudent.checkoutClass(data.idStudent, idClass);
      successToast({
        title: "Checkout realizado!",
        colorScheme: "orange",
      });
    } catch (error) {
      result = false;
      errorToast({
        title: `Não foi possível realizar o checkout desta aula.`,
      });
    } finally {
      setIsloading(false);
    }
    return result;
  };

  return {
    checkIn,
    checkout,
    isLoading,
  };
};
