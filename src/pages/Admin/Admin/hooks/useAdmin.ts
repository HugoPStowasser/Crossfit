import { useEffect, useState } from "react";
import { TAdminData, TAdminFormValues, TAdminHttp } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminFormSchema } from "../schemas/schema";
import { useNavigate, useParams } from "react-router-dom";
import { mapperHttpToForm, mapperHttpToTable } from "../mappers";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useQuery } from "react-query";
import { useAdminRequest } from "./useAdminRequest";

export const useAdmin = () => {
  const [admin, setAdmin] = useState<TAdminData>({} as TAdminData);
  const { idAdmin } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const apiAdmin = useAdminRequest();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TAdminFormValues>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      description: "",
    },
    shouldUnregister: false,
  });

  const getAdminById = async (id: number) => {
    try {
      const { data }: { data: TAdminHttp } = await apiAdmin.getById(id);
      setAdmin(mapperHttpToForm(data));
      return mapperHttpToForm(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar o administrador!`,
      });
    }
    return {};
  };

  const getAllAdmins = async () => {
    try {
      setIsLoading(true);
      const { data }: { data: TAdminHttp[] } = await apiAdmin.getAll();
      return mapperHttpToTable(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar os administradores!`,
      });
    } finally {
      setIsLoading(false);
    }
    return [];
  };

  const { refetch, data: allAdmins } = useQuery({
    queryKey: ["admin"],
    queryFn: getAllAdmins,
  });

  const deleteById = async (id: number) => {
    try {
      await apiAdmin.deleteById(id);
      refetch();
      successToast({
        title: `Administrador deletado com sucesso!`,
      });
    } catch (error) {
      errorToast({
        title: `Não foi possível deletar o administrador!`,
      });
    }
  };

  useEffect(() => {
    if (idAdmin) {
      getAdminById(Number(idAdmin));
    }
  }, [idAdmin]);

  const onSubmitHandler = async (formValues: TAdminFormValues) => {
    try {
      setIsLoading(true);
      const { description } = formValues;
      if (admin.idAdmin) {
        await apiAdmin.update({
          description,
          idAdmin: admin.idAdmin,
        });
        successToast({
          title: `Administrador editado com sucesso!`,
        });
      } else {
        await apiAdmin.insert({ description });
        successToast({
          title: `Administrador cadastrado com sucesso!`,
        });
      }
      navigate("/admin/admin");
    } catch (err) {
      errorToast({
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
    allAdmins,
    getAllAdmins,
    admin,
    setValue,
    deleteById,
    isLoading,
  };
};
