import { useEffect, useRef, useState } from "react";
// import { TClassData, TClassFormValues, TClassHttp } from "../types";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { classFormSchema } from "../schemas/schema";
// import { useNavigate, useParams } from "react-router-dom";
// import { mapperHttpToForm, mapperHttpToTable } from "../mappers";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useQuery } from "react-query";
import { useClassRequest } from "./useClassRequest";
import { TLoadingRef } from "../../../../components/Loading";
import { TClassHttp } from "../types";
import { mapperHttpToTable } from "../mappers";
export const useClass = () => {
  const loadingRef = useRef<TLoadingRef>(null);
  // const [class, setClass] = useState<TClassData>({} as TClassData);
  // const { idClass } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const apiClass = useClassRequest();

  // const formMethods = useForm<TClassFormValues>({
  //   resolver: zodResolver(classFormSchema),
  //   defaultValues: {
  //     description: "",
  //   },
  //   shouldUnregister: false,
  // });

  // const getClassById = async (id: number) => {
  //   try {
  //     loadingRef.current?.onOpenLoading();
  //     const { data }: { data: TClassHttp } = await apiClass.getById(id);
  //     setClass(mapperHttpToForm(data));
  //     return mapperHttpToForm(data);
  //   } catch (error) {
  //     errorToast({
  //       title: `Não foi possível encontrar o aula!`,
  //     });
  //   } finally {
  //     loadingRef.current?.onCloseLoading();
  //   }
  //   return {};
  // };

  const getAllClasss = async () => {
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

  const { refetch, data: allClasss } = useQuery({
    queryKey: ["class"],
    queryFn: getAllClasss,
  });

  const deleteById = async (id: number) => {
    try {
      await apiClass.deleteById(id);
      refetch();
      successToast({
        title: `Exercício deletado com sucesso!`,
      });
    } catch (error) {
      errorToast({
        title: `Não foi possível deletar o aula!`,
      });
    }
  };

  // useEffect(() => {
  //   if (idClass) {
  //     getClassById(Number(idClass));
  //   }
  // }, [idClass]);

  // const onSubmitHandler = async () => {
  //   try {
  //     const { getValues } = formMethods;
  //     setIsLoading(true);
  //     const { description } = getValues();
  //     if (class.idClass) {
  //       await apiClass.update({
  //         description,
  //         idClass: class.idClass,
  //       });
  //       successToast({
  //         title: `Exercício editado com sucesso!`,
  //       });
  //     } else {
  //       await apiClass.insert({ description });
  //       successToast({
  //         title: `Exercício cadastrado com sucesso!`,
  //       });
  //     }
  //     navigate("/admin/class");
  //   } catch (err) {
  //     errorToast({
  //       title: `Não foi possível estabelecer conexão com o servidor`,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return {
    // onSubmit: formMethods.handleSubmit(onSubmitHandler),
    allClasss,
    getAllClasss,
    // class,
    deleteById,
    isLoading,
    loadingRef,
    // formMethods,
  };
};
