import { zodResolver } from "@hookform/resolvers/zod";
import { TRegisterPointsFormValues } from "../types";
import { useRef, useState } from "react";
import { TSelect } from "../../../../@types/select";
import { useForm } from "react-hook-form";
import { registerPointsFormSchema } from "../schema/schema";
import { useExerciseRequest } from "../../../Admin/Exercise/hooks/useExerciseRequest";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { TLoadingRef } from "../../../../components/Loading";
import { useNavigate } from "react-router-dom";
import { useRegisterPointsRequest } from "./useRegisterPointsRequest";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { useUserRequest } from "../../../Admin/User/hooks/useUserRequest";

export const useRegisterPoints = () => {
  const loadingRef = useRef<TLoadingRef>(null);
  const [allExercises, setAllExercises] = useState<TSelect[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { errorToast, successToast } = useCustomToast();
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const apiUser = useUserRequest();

  const apiExercise = useExerciseRequest();
  const apiRegisterPoints = useRegisterPointsRequest();

  const getAllExercises = async () => {
    try {
      const { data } = await apiExercise.getAll();
      setAllExercises(
        data.map(
          (exerciseSelect: { idExercise: number; description: string }) => {
            return {
              value: exerciseSelect.idExercise,
              label: exerciseSelect.description,
              selected: false,
            };
          }
        )
      );
    } catch (error) {
      errorToast({
        title: `Não foi possível buscar os gêneros.`,
      });
    }
  };

  const formMethods = useForm<TRegisterPointsFormValues>({
    resolver: zodResolver(
      registerPointsFormSchema({
        exercises: allExercises.map((item) => Number(item.value)),
      })
    ),
    defaultValues: {
      exercise: "",
      points: 0,
    },
    shouldUnregister: false,
  });

  const onSubmitHandler = async (saveAndContinue: boolean = false) => {
    try {
      const { data: userResponse } = await apiUser.getStudentByUserId(
        currentUser.idUser
      );
      const { getValues } = formMethods;
      setIsLoading(true);
      const { exercise, points } = getValues();

      await apiRegisterPoints.insert({
        idExercise: Number(exercise),
        idStudent: userResponse.idStudent,
        points,
      });

      successToast({
        title: `Exercício registrado com sucesso!`,
      });
      if (saveAndContinue) {
        formMethods.reset();
      } else {
        navigate("/admin/payment");
      }
    } catch (err) {
      errorToast({
        title: `Não foi possível registrar exercício. Conexão perdida!`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onSubmit: (saveAndContinue: boolean = false) =>
      formMethods.handleSubmit(() => onSubmitHandler(saveAndContinue)),
    getAllExercises,
    allExercises,
    formMethods,
    loadingRef,
    isLoading,
  };
};
