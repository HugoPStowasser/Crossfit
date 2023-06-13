import { useMemo, useState } from "react";
import { UseToastOptions, useMediaQuery, useToast } from "@chakra-ui/react";
import { TExerciseHttp } from "../types";
import { ExerciseService } from "../service/http";
import { httpDateToClient } from "../../../../utils/date";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { exerciseFormSchema } from "../schemas/schema";
import { useNavigate } from "react-router-dom";

export const useExercise = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLargerThan720] = useMediaQuery("(min-width: 720px)");
  const navigate = useNavigate();
  const toast = useToast();

  const toastErrorAttributes: UseToastOptions = useMemo(
    () => ({
      title: `Não foi possível encontrar os serviços!`,
      status: "error",
      isClosable: true,
      duration: 2000,
      position: isLargerThan720 ? "top" : "bottom",
    }),
    []
  );
  const toastSuccessAttributes: UseToastOptions = useMemo(
    () => ({
      title: `Exercício cadastrado com sucesso!`,
      status: "success",
      isClosable: true,
      duration: 2000,
      position: isLargerThan720 ? "top" : "bottom",
    }),
    []
  );

  const mapperHttpToTable = (data: TExerciseHttp[]) => {
    return data.map((exercise, index) => {
      return {
        ...exercise,
        index: index + 1,
        createdAt: httpDateToClient(exercise.createdAt),
        updatedAt: httpDateToClient(exercise.updatedAt),
      };
    });
  };

  const { getAll, insert } = ExerciseService();
  const getAllExercises = async () => {
    try {
      const { data }: { data: TExerciseHttp[] } = await getAll();
      return mapperHttpToTable(data);
    } catch (error) {
      toast({
        ...toastErrorAttributes,
      });
    }
    return [];
  };

  type TExerciseFormValues = {
    description: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TExerciseFormValues>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmitHandler = async (formValues: TExerciseFormValues) => {
    try {
      setIsLoading(true);
      const { description } = formValues;
      await insert({ description });
      toast({
        ...toastSuccessAttributes,
      });
      navigate("/admin/exercise");
    } catch (err) {
      toast({
        ...toastErrorAttributes,
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
    isLoading,
    getAllExercises,
  };
};
