import { api } from "../../../../services/http";

export const useDashboardRequest = () => {
  const getStudentNonPaying = () => {
    return api.get("/student/non-paying");
  };

  const unblockStudent = (idStudent: number) => {
    return api.patch(`/student/unblock/${idStudent}`);
  };
  const blockStudent = (idStudent: number) => {
    return api.patch(`/student/unblock/${idStudent}`);
  };

  return {
    getStudentNonPaying,
    unblockStudent,
    blockStudent,
  };
};
