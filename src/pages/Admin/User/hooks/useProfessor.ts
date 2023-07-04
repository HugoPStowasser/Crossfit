import { useEffect, useRef, useState } from "react";
import { TProfessorData, TProfessorFormValues, TProfessorHttp } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useUserRequest } from "./useUserRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { professorFormSchema } from "../schemas/schema";
import { mapperProfessorHttpToForm } from "../mappers";
import { useForm } from "react-hook-form";
import { TLoadingRef } from "../../../../components/Loading";

export const useProfessor = () => {
  const loadingRef = useRef<TLoadingRef>(null);
  const { idProfessor } = useParams();
  const [professor, setProfessor] = useState<TProfessorData>(
    {} as TProfessorData
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();

  const apiUser = useUserRequest();

  const getProfessorByUserId = async (id: number) => {
    try {
      loadingRef.current?.onOpenLoading();
      const { data }: { data: TProfessorHttp } =
        await apiUser.getProfessorByUserId(id);
      setProfessor(mapperProfessorHttpToForm(data));
      return mapperProfessorHttpToForm(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar o professor!`,
      });
    } finally {
      loadingRef.current?.onCloseLoading();
    }
    return {};
  };

  const formMethods = useForm<TProfessorFormValues>({
    resolver: zodResolver(professorFormSchema),
    defaultValues: {
      name: "",
      socialName: "",
    },
    shouldUnregister: false,
  });

  useEffect(() => {
    if (idProfessor) {
      getProfessorByUserId(Number(idProfessor));
    }
  }, [idProfessor]);

  const onSubmitHandler = async () => {
    try {
      const { getValues } = formMethods;
      setIsLoading(true);
      const { name, socialName } = getValues();
      if (professor.idProfessor) {
        await apiUser.updateProfessor({
          name,
          socialName: socialName || "",
          idProfessor: professor.idProfessor,
        });
        successToast({
          title: `Professor editado com sucesso!`,
        });
      } else {
        await apiUser.insertProfessor(getValues());
        successToast({
          title: `Professor cadastrado com sucesso!`,
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
    professor,
    formMethods,
    isLoading,
    loadingRef,
  };
};
