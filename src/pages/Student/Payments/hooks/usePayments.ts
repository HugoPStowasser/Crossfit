import { useEffect, useRef } from "react";
import { TLoadingRef } from "../../../../components/Loading";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { usePaymentRequest } from "../../../Admin/Payment/hooks/usePaymentRequest";
import { useUserRequest } from "../../../Admin/User/hooks/useUserRequest";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import { TPaymentHttp } from "../../../Admin/Payment/types";

export const usePayments = () => {
  const loadingRef = useRef<TLoadingRef>(null);
  const apiPayment = usePaymentRequest();
  const apiUser = useUserRequest();
  const { errorToast } = useCustomToast();
  const { currentUser } = useCurrentUser();

  const getPaymentsByStudent = async () => {
    try {
      const idUser =
        currentUser.idUser ||
        JSON.parse(localStorage.getItem("@User") || "{}").idUser;
      loadingRef.current?.onOpenLoading();
      const { data: studentResponse } = await apiUser.getStudentByUserId(
        idUser
      );
      const { data } = await apiPayment.getAllByIdStudent(
        studentResponse.idStudent
      );
      const dataSortted = data.sort(
        (a: TPaymentHttp, b: TPaymentHttp) =>
          new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
      );
      return dataSortted.map((item: TPaymentHttp) => {
        return {
          datePayment: item.datePayment
            ? dayjs(item.datePayment).locale("pt-br").format("DD/MM/YYYY")
            : "",
          dueDate: dayjs(item.dueDate).locale("pt-br").format("DD/MM/YYYY"),
          idPayment: item.idPayment,
          invoice: item.invoice?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
          }),
          paymentType: item.paymentType?.name,
          status: item.status.name,
          normalizedStatus: dayjs(item.dueDate).isBefore(new Date())
            ? "OVERDUE"
            : item.status.normalizedName,
        };
      });
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar o student!`,
      });
    } finally {
      loadingRef.current?.onCloseLoading();
    }
    return [];
  };

  const { data: allPayments } = useQuery({
    queryKey: ["payments-by-student"],
    queryFn: getPaymentsByStudent,
  });

  return {
    loadingRef,
    allPayments,
  };
};
