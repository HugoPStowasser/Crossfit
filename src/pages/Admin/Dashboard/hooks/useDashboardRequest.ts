import { api } from "../../../../services/http";

export const useDashboardRequest = () => {
  const getStudentNonPaying = () => {
    return api.get("/student/non-paying");
  };

  return {
    getStudentNonPaying,
  };
};
