import { useEffect, useRef, useState } from "react";
import { TStatusData, TStatusFormValues, TStatusHttp } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { statusFormSchema } from "../schemas/schema";
import { useNavigate, useParams } from "react-router-dom";
import { mapperHttpToForm, mapperHttpToTable } from "../mappers";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useQuery } from "react-query";
import { useStatusRequest } from "./useStatusRequest";
import { TLoadingRef } from "../../../../components/Loading";

export const useStatus = () => {
  const loadingRef = useRef<TLoadingRef>(null);
  const [status, setStatus] = useState<TStatusData>({} as TStatusData);
  const { idStatus } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const apiStatus = useStatusRequest();

  const formMethods = useForm<TStatusFormValues>({
    resolver: zodResolver(statusFormSchema),
    defaultValues: {
      name: "",
    },
    shouldUnregister: false,
  });

  const getStatusById = async (id: number) => {
    try {
      loadingRef.current?.onOpenLoading();
      const { data }: { data: TStatusHttp } = await apiStatus.getById(id);
      setStatus(mapperHttpToForm(data));
      return mapperHttpToForm(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar o status!`,
      });
    } finally {
      loadingRef.current?.onCloseLoading();
    }
    return {};
  };

  const getAllStatus = async () => {
    try {
      setIsLoading(true);
      const { data }: { data: TStatusHttp[] } = await apiStatus.getAll();
      return mapperHttpToTable(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar os status!`,
      });
    } finally {
      setIsLoading(false);
    }
    return [];
  };

  const { refetch, data: allStatus } = useQuery({
    queryKey: ["status"],
    queryFn: getAllStatus,
  });

  const deleteById = async (id: number) => {
    try {
      await apiStatus.deleteById(id);
      refetch();
      successToast({
        title: `Status deletado com sucesso!`,
      });
    } catch (error) {
      errorToast({
        title: `Não foi possível deletar o status!`,
      });
    }
  };

  useEffect(() => {
    if (idStatus) {
      getStatusById(Number(idStatus));
    }
  }, [idStatus]);

  const onSubmitHandler = async () => {
    try {
      const { getValues } = formMethods;
      setIsLoading(true);
      const { name } = getValues();
      if (status.idStatus) {
        await apiStatus.update({
          name,
          idStatus: status.idStatus,
        });
        successToast({
          title: `Status editado com sucesso!`,
        });
      } else {
        await apiStatus.insert({ name });
        successToast({
          title: `Status cadastrado com sucesso!`,
        });
      }
      navigate("/admin/status");
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
    allStatus,
    getAllStatus,
    status,
    deleteById,
    isLoading,
    loadingRef,
    formMethods,
  };
};