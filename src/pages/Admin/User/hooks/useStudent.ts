import { useState, useEffect, useRef } from "react";
import { TStudentData, TStudentFormValues, TStudentHttp } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useUserRequest } from "./useUserRequest";
import { mapperStudentHttpToForm } from "../mappers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  studentCreateFormSchema,
  studentUpdateFormSchema,
} from "../schemas/schema";
import { TLoadingRef } from "../../../../components/Loading";
import { useGenderRequest } from "../../../../hooks/useSelectsRequest";
import { TSelect } from "../../../../@types/select";

export const useStudent = () => {
  const loadingRef = useRef<TLoadingRef>(null);
  const { idStudent } = useParams();
  const [student, setStudent] = useState<TStudentData>({} as TStudentData);
  const [allGenders, setAllGenders] = useState<TSelect[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const apiGender = useGenderRequest();
  const apiUser = useUserRequest();

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
      const { data }: { data: TStudentHttp } = await apiUser.getStudentById(id);
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

  const formMethods = useForm<TStudentFormValues>({
    resolver: idStudent
      ? zodResolver(
          studentUpdateFormSchema({
            genderIds: allGenders.map((item) => item.value),
          })
        )
      : zodResolver(
          studentCreateFormSchema({
            genderIds: allGenders.map((item) => item.value),
          })
        ),
    defaultValues: {
      name: "",
      socialName: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthDate: "",
    },
    shouldUnregister: false,
  });

  useEffect(() => {
    if (idStudent) {
      getStudentById(Number(idStudent));
    }
  }, [idStudent]);

  useEffect(() => {
    if (student.idGender) {
      getAllGender();
    }
  }, [student.idGender]);

  const onSubmitHandler = async () => {
    try {
      const { getValues } = formMethods;
      setIsLoading(true);
      const values = getValues();
      const data = {
        ...values,
        idGender: Number(values.gender),
      };
      if (student.idStudent) {
        await apiUser.updateStudent({
          ...data,
          socialName: data.socialName || "",
          idStudent: student.idStudent,
        });
        successToast({
          title: `Student editado com sucesso!`,
        });
      } else {
        await apiUser.insertStudent(data);
        successToast({
          title: `Student cadastrado com sucesso!`,
        });
      }
      navigate("/admin/user");
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
    formMethods,
    student,
    isLoading,
    loadingRef,
    allGenders,
    getAllGender: idStudent ? () => Promise<void> : getAllGender,
  };
};
