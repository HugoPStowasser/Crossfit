import { useEffect, useRef, useState } from "react";
import { TLoadingRef } from "../../../../components/Loading";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  TStudentData,
  TStudentHttp,
  TStudentUpdateFormValues,
} from "../../../Admin/User/types";
import { TSelect } from "../../../../@types/select";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useGenderRequest } from "../../../../hooks/useSelectsRequest";
import { useUserRequest } from "../../../Admin/User/hooks/useUserRequest";
import { mapperStudentHttpToForm } from "../../../Admin/User/mappers";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentUpdateFormSchema } from "../../../Admin/User/schemas/schema";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";

export const useEditProfile = () => {
  const loadingRef = useRef<TLoadingRef>(null);
  const [student, setStudent] = useState<TStudentData>({} as TStudentData);
  const [allGenders, setAllGenders] = useState<TSelect[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const apiGender = useGenderRequest();
  const apiUser = useUserRequest();
  const { currentUser } = useCurrentUser();

  const getAllGender = async () => {
    try {
      const { data } = await apiGender.getAll();
      setAllGenders(
        data.map((gender: { idGender: number; name: string }) => {
          return {
            value: gender.idGender,
            label: gender.name,
            selected: student.idGender === gender.idGender,
          };
        })
      );
    } catch (error) {
      errorToast({
        title: `Não foi possível buscar os gêneros.`,
      });
    }
  };

  const getStudentById = async (id: number) => {
    let result = {};
    try {
      loadingRef.current?.onOpenLoading();
      const { data }: { data: TStudentHttp } = await apiUser.getStudentByUserId(
        id
      );
      setStudent(mapperStudentHttpToForm(data));
      result = mapperStudentHttpToForm(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar o student!`,
      });
    } finally {
      loadingRef.current?.onCloseLoading();
    }
    return result;
  };

  const formMethods = useForm<TStudentUpdateFormValues>({
    resolver: zodResolver(
      studentUpdateFormSchema({
        genderIds: allGenders.map((item) => item.value),
      })
    ),
    defaultValues: {
      name: "",
      socialName: "",
      email: "",
      password: "",
      birthDate: "",
    },
    shouldUnregister: false,
  });

  const onSubmitHandler = async () => {
    try {
      const { getValues } = formMethods;
      setIsLoading(true);
      const values = getValues();
      const data = {
        ...values,
        idGender: Number(values.gender),
      };
      await apiUser.updateStudent({
        ...data,
        socialName: data.socialName || "",
        idStudent: student.idStudent,
      });
      successToast({
        title: `Suas alterações foram salvas com sucesso!`,
      });
    } catch (err) {
      errorToast({
        title: `Não foi possível estabelecer conexão com o servidor`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser.idUser) {
      getStudentById(Number(currentUser.idUser));
    }
  }, [currentUser.idUser]);

  useEffect(() => {
    if (student.idGender) {
      getAllGender();
    }
  }, [student.idGender]);

  return {
    onSubmit: formMethods.handleSubmit(onSubmitHandler),
    formMethods,
    student,
    isLoading,
    loadingRef,
    allGenders,
    getAllGender: currentUser.idUser ? () => Promise<void> : getAllGender,
  };
};
