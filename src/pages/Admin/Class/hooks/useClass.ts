import { useEffect, useRef, useState } from "react";
import {
  TClassData,
  TClassHttp,
  TClassFormValues,
  TMapperHttpToTable,
} from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { mapperHttpToForm, mapperHttpToTable } from "../mappers";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useQuery } from "react-query";
import { useClassRequest } from "./useClassRequest";
import { TLoadingRef } from "../../../../components/Loading";
import { TSelect } from "../../../../@types/select";
import { classFormSchema } from "../schema/schema";
import { addHours, format } from "date-fns";
import { useProfessorsRequest } from "../../../../hooks/useSelectsRequest";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { useUserRequest } from "../../User/hooks/useUserRequest";

type TProfessorHttp = { idProfessor: number; name: string; socialName: string };
export const useClass = () => {
  const loadingRef = useRef<TLoadingRef>(null);
  const [classData, setClassData] = useState<TClassData>({} as TClassData);
  const [allProfessors, setAllProfessors] = useState<TSelect[]>([]);
  const { idClass } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const apiClass = useClassRequest();
  const apiProfessor = useProfessorsRequest();
  const { currentUser } = useCurrentUser();
  const apiUser = useUserRequest();

  const getAllProfessors = async () => {
    try {
      const { data } = await apiProfessor.getAll();
      setAllProfessors(
        data.map((professor: TProfessorHttp) => {
          return {
            value: professor.idProfessor,
            label: professor.socialName || professor.name,
            selected: classData.idProfessor === professor.idProfessor,
          };
        })
      );
    } catch (error) {
      errorToast({
        title: `Não foi possível buscar os professores.`,
      });
    }
  };

  const formMethods = useForm<TClassFormValues>({
    resolver: zodResolver(
      classFormSchema({
        professors: allProfessors.map((item) => Number(item.value)),
      })
    ),
    defaultValues: {
      date: new Date().toDateString(),
      startHour: format(new Date(), "HH:mm:ss"),
      endHour: format(addHours(new Date(), 2), "HH:mm:ss"),
    },
    shouldUnregister: false,
  });

  const getClassById = async (id: number) => {
    try {
      loadingRef.current?.onOpenLoading();
      const { data }: { data: TClassHttp } = await apiClass.getById(id);
      setClassData(mapperHttpToForm(data));
      return mapperHttpToForm(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar o aula!`,
      });
    } finally {
      loadingRef.current?.onCloseLoading();
    }
    return {};
  };

  const getAllClasses = async () => {
    try {
      setIsLoading(true);
      const { data }: { data: TClassHttp[] } = await apiClass.getAll();
      return mapperHttpToTable(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar os aulas!`,
      });
    } finally {
      setIsLoading(false);
    }
    return [];
  };

  const { refetch, data: allClasses } = useQuery<
    any,
    any,
    TMapperHttpToTable[]
  >({
    queryKey: ["class"],
    queryFn: getAllClasses,
  });

  const deleteById = async (id: number) => {
    try {
      await apiClass.deleteById(id);
      refetch();
      successToast({
        title: `Aula deletado com sucesso!`,
      });
    } catch (error) {
      errorToast({
        title: `Não foi possível deletar o aula!`,
      });
    }
  };

  useEffect(() => {
    if (idClass && !classData.idClass) {
      getClassById(Number(idClass));
    }
  }, [idClass]);

  useEffect(() => {
    if (classData.idProfessor) {
      getAllProfessors();
    }
  }, [classData.idProfessor]);

  const onSubmitHandler = async () => {
    try {
      const { getValues } = formMethods;
      setIsLoading(true);
      const formValues = getValues();
      const data = {
        idAdmin: currentUser.idUser,
        idClass: classData.idClass,
        description: formValues.description,
        name: formValues.name,
        endHour: formValues.endHour,
        startHour: formValues.startHour,
        date: formValues.date,
        idProfessor: Number(formValues.professor),
        idStatus: 1,
      };
      if (classData.idClass) {
        await apiClass.update(data);
        successToast({
          title: `Aula editado com sucesso!`,
        });
      } else {
        const { data: dataAdmin } = await apiUser.getAdminById(
          currentUser.idUser
        );
        await apiClass.insert(data, dataAdmin.idAdmin);
        successToast({
          title: `Aula cadastrado com sucesso!`,
        });
      }
      navigate("/admin/class");
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
    allClasses,
    getAllClasses,
    classData,
    deleteById,
    isLoading,
    loadingRef,
    formMethods,
    allProfessors,
    getAllProfessors: idClass ? () => Promise<void> : getAllProfessors,
  };
};
