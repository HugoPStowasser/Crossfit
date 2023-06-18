import { useEffect, useRef, useState } from "react";
import { TExerciseData, TExerciseFormValues, TExerciseHttp } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { exerciseFormSchema } from "../schemas/schema";
import { useNavigate, useParams } from "react-router-dom";
import { mapperHttpToForm, mapperHttpToTable } from "../mappers";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useQuery } from "react-query";
import { useExerciseRequest } from "./useExerciseRequest";
import { TLoadingRef } from "../../../../components/Loading";
export const useExercise = () => {
  const loadingRef = useRef<TLoadingRef>(null);
  const [exercise, setExercise] = useState<TExerciseData>({} as TExerciseData);
  const { idExercise } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const apiExercise = useExerciseRequest();

  const formMethods = useForm<TExerciseFormValues>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      description: "",
    },
    shouldUnregister: false,
  });

  const getExerciseById = async (id: number) => {
    try {
      loadingRef.current?.onOpenLoading();
      const { data }: { data: TExerciseHttp } = await apiExercise.getById(id);
      setExercise(mapperHttpToForm(data));
      return mapperHttpToForm(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar o exercício!`,
      });
    } finally {
      loadingRef.current?.onCloseLoading();
    }
    return {};
  };

  const getAllExercises = async () => {
    try {
      setIsLoading(true);
      const { data }: { data: TExerciseHttp[] } = await apiExercise.getAll();
      return mapperHttpToTable(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar os exercícios!`,
      });
    } finally {
      setIsLoading(false);
    }
    return [];
  };

  const { refetch, data: allExercises } = useQuery({
    queryKey: ["exercise"],
    queryFn: getAllExercises,
  });

  const deleteById = async (id: number) => {
    try {
      await apiExercise.deleteById(id);
      refetch();
      successToast({
        title: `Exercício deletado com sucesso!`,
      });
    } catch (error) {
      errorToast({
        title: `Não foi possível deletar o exercício!`,
      });
    }
  };

  useEffect(() => {
    if (idExercise) {
      getExerciseById(Number(idExercise));
    }
  }, [idExercise]);

  const onSubmitHandler = async () => {
    try {
      const { getValues } = formMethods;
      setIsLoading(true);
      const { description } = getValues();
      if (exercise.idExercise) {
        await apiExercise.update({
          description,
          idExercise: exercise.idExercise,
        });
        successToast({
          title: `Exercício editado com sucesso!`,
        });
      } else {
        await apiExercise.insert({ description });
        successToast({
          title: `Exercício cadastrado com sucesso!`,
        });
      }
      navigate("/admin/exercise");
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
    allExercises,
    getAllExercises,
    exercise,
    deleteById,
    isLoading,
    loadingRef,
    formMethods,
  };
};
