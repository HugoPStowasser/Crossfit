import { useEffect, useRef, useState } from "react";
import { TStudentPointsData, TExerciseHttp, TExerciseData } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { mapperHttpToForm, mapperHttpToTable } from "../mappers";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useQuery } from "react-query";
import { useStudentPointsRequest } from "./useStudentPointsRequest";
import { TLoadingRef } from "../../../../components/Loading";

export const useStudentPoints = () => {
    const loadingRef = useRef<TLoadingRef>(null);
    const [exercise, setExercise] = useState<TExerciseData>({} as TExerciseData);
    const { idExercise } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { errorToast, successToast } = useCustomToast();
    const apiStudentPoints = useStudentPointsRequest();

    const getAllExercises = async () => {
        try {
          setIsLoading(true);
          const { data }: { data: TExerciseHttp[] } = await apiStudentPoints.getAllExercises();
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

      return {
        getAllExercises,
      };
}