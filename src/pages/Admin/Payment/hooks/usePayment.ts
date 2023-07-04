import { useEffect, useRef, useState } from "react";
import { TPaymentData, TPaymentFormValues, TPaymentHttp } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentUpdateFormSchema } from "../schema/schema";
import { useNavigate, useParams } from "react-router-dom";
import { mapperHttpToForm, mapperHttpToTable } from "../mappers";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useQuery } from "react-query";
import { usePaymentRequest } from "./usePaymentRequest";
import { TLoadingRef } from "../../../../components/Loading";
import { TSelect } from "../../../../@types/select";
import { usePaymentTypeRequest } from "../../../../hooks/useSelectsRequest";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
export const usePayment = () => {
  const loadingRef = useRef<TLoadingRef>(null);
  const [allPaymentTypes, setAllPaymentTypes] = useState<TSelect[]>([]);
  const [payment, setPayment] = useState<TPaymentData>({} as TPaymentData);
  const { idPayment } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const apiPayment = usePaymentRequest();
  const apiPaymentType = usePaymentTypeRequest();

  const getAllPaymentTypes = async () => {
    try {
      const { data } = await apiPaymentType.getAll();
      setAllPaymentTypes(
        data.map((paymentType: { idPaymentType: number; name: string }) => {
          return {
            value: paymentType.idPaymentType,
            label: paymentType.name,
            selected: payment.idPaymentType === paymentType.idPaymentType,
          };
        })
      );
    } catch (error) {
      errorToast({
        title: `Não foi possível buscar os gêneros.`,
      });
    }
  };

  const formMethods = useForm<TPaymentFormValues>({
    resolver: zodResolver(
      paymentUpdateFormSchema({
        paymentTypes: allPaymentTypes.map((item) => Number(item.value)),
      })
    ),
    defaultValues: {
      status: "",
      studentName: "",
      dueDate: "",
      invoice: 0,
      datePayment: new Date().toDateString(),
    },
    shouldUnregister: false,
  });

  const getPaymentById = async (id: number) => {
    try {
      loadingRef.current?.onOpenLoading();
      const { data }: { data: TPaymentHttp } = await apiPayment.getById(id);
      setPayment(mapperHttpToForm(data));
      return mapperHttpToForm(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar o pagamento!`,
      });
    } finally {
      loadingRef.current?.onCloseLoading();
    }
    return {};
  };

  const getAllPayments = async () => {
    try {
      setIsLoading(true);
      const { data }: { data: TPaymentHttp[] } = await apiPayment.getAll();
      return mapperHttpToTable(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar os pagamentos!`,
      });
    } finally {
      setIsLoading(false);
    }
    return [];
  };

  const { data: allPayments } = useQuery({
    queryKey: ["payment"],
    queryFn: getAllPayments,
  });

  useEffect(() => {
    if (idPayment) {
      getPaymentById(Number(idPayment));
    }
  }, [idPayment]);

  useEffect(() => {
    if (payment.paymentType?.name) {
      setAllPaymentTypes([
        {
          value: payment.idPaymentType,
          label: payment.paymentType.name,
          selected: true,
        },
      ]);
    }
  }, [payment.idPayment]);

  const onSubmitHandler = async () => {
    try {
      const { getValues } = formMethods;
      setIsLoading(true);
      const { datePayment, invoice, paymentType } = getValues();
      await apiPayment.update({
        idPayment: payment.idPayment,
        idPaymentType: Number(paymentType),
        invoice,
        datePayment,
        idAdmin: currentUser.idUser,
      });
      successToast({
        title: `Pagamento lançado com sucesso!`,
      });
      navigate("/admin/payment");
    } catch (err) {
      errorToast({
        title: `Não foi possível estabelecer conexão com o servidor`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onSubmit: formMethods.handleSubmit(onSubmitHandler),
    allPayments,
    getAllPayments,
    payment,
    isLoading,
    loadingRef,
    formMethods,
    allPaymentTypes,
    getAllPaymentTypes,
  };
};
