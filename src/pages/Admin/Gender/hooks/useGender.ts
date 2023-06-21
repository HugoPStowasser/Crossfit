import { useEffect, useRef, useState } from "react";
import { TGenderData, TGenderFormValues, TGenderHttp } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { genderFormSchema } from "../schemas/schema";
import { useNavigate, useParams } from "react-router-dom";
import { mapperHttpToForm, mapperHttpToTable } from "../mappers";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useQuery } from "react-query";
import { useGenderRequest } from "./useGenderRequest";
import { TLoadingRef } from "../../../../components/Loading";

export const useGender = () => {
  const loadingRef = useRef<TLoadingRef>(null);
  const [gender, setGender] = useState<TGenderData>({} as TGenderData);
  const { idGender } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const apiGender = useGenderRequest();

  const formMethods = useForm<TGenderFormValues>({
    resolver: zodResolver(genderFormSchema),
    defaultValues: {
      name: "",
    },
    shouldUnregister: false,
  });

  const getGenderById = async (id: number) => {
    try {
      loadingRef.current?.onOpenLoading();
      const { data }: { data: TGenderHttp } = await apiGender.getById(id);
      setGender(mapperHttpToForm(data));
      return mapperHttpToForm(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar o gênero!`,
      });
    } finally {
      loadingRef.current?.onCloseLoading();
    }
    return {};
  };

  const getAllGenders = async () => {
    try {
      setIsLoading(true);
      const { data }: { data: TGenderHttp[] } = await apiGender.getAll();
      return mapperHttpToTable(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar os gêneros!`,
      });
    } finally {
      setIsLoading(false);
    }
    return [];
  };

  const { refetch, data: allGenders } = useQuery({
    queryKey: ["gender"],
    queryFn: getAllGenders,
  });

  const deleteById = async (id: number) => {
    try {
      await apiGender.deleteById(id);
      refetch();
      successToast({
        title: `Gênero deletado com sucesso!`,
      });
    } catch (error) {
      errorToast({
        title: `Não foi possível deletar o gênero!`,
      });
    }
  };

  useEffect(() => {
    if (idGender) {
      getGenderById(Number(idGender));
    }
  }, [idGender]);

  const onSubmitHandler = async () => {
    try {
      const { getValues } = formMethods;
      setIsLoading(true);
      const { name } = getValues();
      if (gender.idGender) {
        await apiGender.update({
          name,
          idGender: gender.idGender,
        });
        successToast({
          title: `Gênero editado com sucesso!`,
        });
      } else {
        await apiGender.insert({ name });
        successToast({
          title: `Gênero cadastrado com sucesso!`,
        });
      }
      navigate("/admin/gender");
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
    allGenders,
    getAllGenders,
    gender,
    deleteById,
    isLoading,
    loadingRef,
    formMethods,
  };
};
