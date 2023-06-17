import { useEffect, useState } from "react";
import { TProfessorData, TProfessorFormValues, TProfessorHttp } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useUserRequest } from "./useUserRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { professorFormSchema } from "../schemas/schema";
import { mapperProfessorHttpToForm } from "../mappers";
import { useForm } from "react-hook-form";
import { useUser } from "./useUser";

export const useProfessor = () => {
  const { idProfessor } = useParams();
  const [professor, setProfessor] = useState<TProfessorData>(
    {} as TProfessorData
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const {} = useUser();

  const apiUser = useUserRequest();

  const getProfessorById = async (id: number) => {
    try {
      const { data }: { data: TProfessorHttp } = await apiUser.getProfessorById(
        id
      );
      setProfessor(mapperProfessorHttpToForm(data));
      return mapperProfessorHttpToForm(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar o professor!`,
      });
    }
    return {};
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TProfessorFormValues>({
    resolver: zodResolver(professorFormSchema),
    defaultValues: {
      name: "",
      socialName: "",
    },
    shouldUnregister: false,
  });

  useEffect(() => {
    if (idProfessor) {
      getProfessorById(Number(idProfessor));
    }
  }, [idProfessor]);

  const onSubmitHandler = async (formValues: TProfessorFormValues) => {
    try {
      setIsLoading(true);
      const { name, socialName } = formValues;
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
        await apiUser.insertProfessor(formValues);
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
    register,
    onSubmit: handleSubmit(onSubmitHandler),
    errors,
    professor,
    setValue,
    isLoading,
  };
};
