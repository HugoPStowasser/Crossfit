import { useState, useEffect } from "react";
import { TAdminData, TAdminFormValues, TAdminHttp } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useUserRequest } from "./useUserRequest";
import { mapperAdminHttpToForm } from "../mappers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  adminCreateFormSchema,
  adminUpdateFormSchema,
} from "../schemas/schema";

export const useAdmin = () => {
  const { idAdmin } = useParams();
  const [admin, setAdmin] = useState<TAdminData>({} as TAdminData);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();

  const apiUser = useUserRequest();

  const getAdminById = async (id: number) => {
    try {
      const { data }: { data: TAdminHttp } = await apiUser.getAdminById(id);
      setAdmin(mapperAdminHttpToForm(data));
      return mapperAdminHttpToForm(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar o admin!`,
      });
    }
    return {};
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TAdminFormValues>({
    resolver: idAdmin
      ? zodResolver(adminUpdateFormSchema)
      : zodResolver(adminCreateFormSchema),
    defaultValues: {
      name: "",
      socialName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    shouldUnregister: false,
  });

  useEffect(() => {
    if (idAdmin) {
      getAdminById(Number(idAdmin));
    }
  }, [idAdmin]);

  const onSubmitHandler = async () => {
    try {
      setIsLoading(true);
      const { name, socialName, password, email } = getValues();
      if (admin.idAdmin) {
        await apiUser.updateAdmin({
          name,
          socialName: socialName || "",
          idAdmin: admin.idAdmin,
          password,
          email,
        });
        successToast({
          title: `Admin editado com sucesso!`,
        });
      } else {
        await apiUser.insertAdmin(getValues());
        successToast({
          title: `Admin cadastrado com sucesso!`,
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
    admin,
    setValue,
    isLoading,
  };
};
