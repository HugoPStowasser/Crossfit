import { useQuery } from "react-query";
import { usePaymentRequest } from "../../Payment/hooks/usePaymentRequest";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { TPaymentHttp } from "../../Payment/types";
import paymentMappers from "../../Payment/mappers";
import classMappers from "../../Class/mappers";
import { useClassRequest } from "../../Class/hooks/useClassRequest";
import { TClassHttp, TMapperHttpToTable } from "../../Class/types";
import { useDashboardRequest } from "./useDashboardRequest";
import { TStudentNonPaying, TStudentNonPayingHttp } from "../types";
import dayjs from "dayjs";

export const useDashboard = () => {
  const apiPayment = usePaymentRequest();
  const apiClass = useClassRequest();
  const apiDasbhoard = useDashboardRequest();

  const { errorToast, successToast } = useCustomToast();

  const getAllClasses = async () => {
    try {
      const { data }: { data: TClassHttp[] } = await apiClass.getAll();
      const currentDateTime = dayjs();
      return classMappers.mapperHttpToTable(
        data
          ?.filter((c) => {
            const hour = Number(c.startHour.split(":")[0]);
            const min = Number(c.startHour.split(":")[1]);
            const sec = Number(c.startHour.split(":")[2]);
            const classDateTime = dayjs(c.date)
              .set("hour", hour)
              .set("minute", min)
              .set("second", sec);

            if (classDateTime.isSame(currentDateTime, "day")) {
              return classDateTime.isAfter(currentDateTime);
            }

            return (
              classDateTime.isAfter(currentDateTime) ||
              classDateTime.isSame(currentDateTime, "day")
            );
          })
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .slice(0, 2)
      );
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar as aulas!`,
      });
    }
    return [];
  };

  const getAllStudentNonPaying = async (): Promise<TStudentNonPaying[]> => {
    try {
      const { data }: { data: TStudentNonPayingHttp[] } =
        await apiDasbhoard.getStudentNonPaying();
      return data.map((item) => ({
        idStudent: item.idStudent,
        idPayment: item.idPayment,
        email: item.email,
        student: item.socialName || item.name,
        isBlocked: item.isBlocked,
        status: item.status.name,
        dueDate: dayjs(item.dueDate).format("DD/MM/YYYY"),
      }));
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar os estudantes inadimplementes!`,
      });
    }
    return [];
  };

  const getAllPayments = async () => {
    try {
      const { data }: { data: TPaymentHttp[] } = await apiPayment.getAll();
      return paymentMappers
        .mapperHttpToTable(data)
        .filter((item) => item.datePayment)
        .sort((a, b) => {
          if (b.datePayment && a.datePayment) {
            return new Date(a.datePayment) < new Date(b.datePayment) ? -1 : 1;
          }
          return 0;
        })
        .slice(0, 5)
        .map((item) => ({
          ...item,
          datePayment: dayjs(item.datePayment).format("DD/MM/YYYY"),
        }));
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar os pagamentos!`,
      });
    }
    return [];
  };

  const { data: allPayments, isLoading: paymentIsLoading } = useQuery({
    queryKey: ["payment_dashboard"],
    queryFn: getAllPayments,
  });
  const {
    data: allStudentsNonPaying,
    isLoading: studentsNonPayingIsLoading,
    refetch,
  } = useQuery({
    queryKey: ["students-non-paying"],
    queryFn: getAllStudentNonPaying,
  });

  const { data: allClasses, isLoading: classesIsLoading } = useQuery<
    any,
    any,
    TMapperHttpToTable[]
  >({
    queryKey: ["class"],
    queryFn: getAllClasses,
  });

  const unblock = async (idStudent: number) => {
    let result = true;
    try {
      await apiDasbhoard.unblockStudent(idStudent);
      refetch();
      successToast({
        title: "Usuário desbloqueado com sucesso!",
      });
    } catch (error) {
      result = false;
      errorToast({
        title: `Não foi possível desbloquear este usuário!`,
      });
    }
    return result;
  };

  return {
    paymentIsLoading,
    classesIsLoading,
    studentsNonPayingIsLoading,
    allPayments,
    allClasses,
    allStudentsNonPaying,
    unblock,
  };
};
