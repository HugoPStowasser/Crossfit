import { useEffect, useState } from "react";
import { TGenderData, TGenderFormValues, TGenderHttp } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { genderFormSchema } from "../schemas/schema";
import { useNavigate, useParams } from "react-router-dom";
import { mapperHttpToForm, mapperHttpToTable } from "../mappers";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useQuery } from "react-query";
import { useGenderRequest } from "./useGenderRequest";

export const useGender = () => {
  const [gender, setGender] = useState<TGenderData>({} as TGenderData);
  const { idGender } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const apiGender = useGenderRequest();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TGenderFormValues>({
    resolver: zodResolver(genderFormSchema),
    defaultValues: {
      name: "",
    },
    shouldUnregister: false,
  });

  const getGenderById = async (id: number) => {
    try {
      const { data }: { data: TGenderHttp } = await apiGender.getById(id);
      setGender(mapperHttpToForm(data));
      return mapperHttpToForm(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar o gênero!`,
      });
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

  const onSubmitHandler = async (formValues: TGenderFormValues) => {
    try {
      setIsLoading(true);
      const { name } = formValues;
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
    onSubmitHandler,
    register,
    handleSubmit,
    errors,
    allGenders,
    getAllGenders,
    gender,
    setValue,
    deleteById,
    isLoading,
  };
};
