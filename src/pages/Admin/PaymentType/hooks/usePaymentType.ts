import { useEffect, useRef, useState } from "react";
import { TPaymentTypeData, TPaymentTypeFormValues, TPaymentTypeHttp } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentTypeFormSchema } from "../schemas/schema";
import { useNavigate, useParams } from "react-router-dom";
import { mapperHttpToForm, mapperHttpToTable } from "../mappers";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useQuery } from "react-query";
import { usePaymentTypeRequest } from "./usePaymentTypeRequest";
import { TLoadingRef } from "../../../../components/Loading";

export const usePaymentType = () => {
  const loadingRef = useRef<TLoadingRef>(null);
  const [paymentType, setPaymentType] = useState<TPaymentTypeData>({} as TPaymentTypeData);
  const { idPaymentType } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const apiPaymentType = usePaymentTypeRequest();

  const formMethods = useForm<TPaymentTypeFormValues>({
    resolver: zodResolver(paymentTypeFormSchema),
    defaultValues: {
      name: "",
    },
    shouldUnregister: false,
  });

  const getPaymentTypeById = async (id: number) => {
    try {
      loadingRef.current?.onOpenLoading();
      const { data }: { data: TPaymentTypeHttp } = await apiPaymentType.getById(id);
      setPaymentType(mapperHttpToForm(data));
      return mapperHttpToForm(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar o tipo de pagamento!`,
      });
    } finally {
      loadingRef.current?.onCloseLoading();
    }
    return {};
  };

  const getAllPaymentTypes = async () => {
    try {
      setIsLoading(true);
      const { data }: { data: TPaymentTypeHttp[] } = await apiPaymentType.getAll();
      return mapperHttpToTable(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar os tipos de pagamento!`,
      });
    } finally {
      setIsLoading(false);
    }
    return [];
  };

  const { refetch, data: allPaymentTypes } = useQuery({
    queryKey: ["paymentTypes"],
    queryFn: getAllPaymentTypes,
  });

  const deleteById = async (id: number) => {
    try {
      await apiPaymentType.deleteById(id);
      refetch();
      successToast({
        title: `Tipo de pagamento deletado com sucesso!`,
      });
    } catch (error) {
      errorToast({
        title: `Não foi possível deletar o tipo de pagamento!`,
      });
    }
  };

  useEffect(() => {
    if (idPaymentType) {
      getPaymentTypeById(Number(idPaymentType));
    }
  }, [idPaymentType]);

  const onSubmitHandler = async () => {
    try {
      const { getValues } = formMethods;
      setIsLoading(true);
      const { name } = getValues();
      if (paymentType.idPaymentType) {
        await apiPaymentType.update({
          name,
          idPaymentType: paymentType.idPaymentType,
        });
        successToast({
          title: `Tipo de pagamento editado com sucesso!`,
        });
      } else {
        await apiPaymentType.insert({ name });
        successToast({
          title: `Tipo de pagamento cadastrado com sucesso!`,
        });
      }
      navigate("/admin/paymentType");
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
    allPaymentTypes,
    getAllPaymentTypes,
    paymentType,
    deleteById,
    isLoading,
    loadingRef,
    formMethods,
  };
};
