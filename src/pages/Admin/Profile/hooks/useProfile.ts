import { useEffect, useRef, useState } from "react";
import { TProfileData, TProfileFormValues, TProfileHttp } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormSchema } from "../schemas/schema";
import { useNavigate, useParams } from "react-router-dom";
import { mapperHttpToForm, mapperHttpToTable } from "../mappers";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useQuery } from "react-query";
import { useProfileRequest } from "./useProfileRequest";
import { TLoadingRef } from "../../../../components/Loading";

export const useProfile = () => {
  const loadingRef = useRef<TLoadingRef>(null);
  const [profile, setProfile] = useState<TProfileData>({} as TProfileData);
  const { idProfile } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const apiProfile = useProfileRequest();

  const formMethods = useForm<TProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
    },
    shouldUnregister: false,
  });

  const getProfileById = async (id: number) => {
    try {
      loadingRef.current?.onOpenLoading();
      const { data }: { data: TProfileHttp } = await apiProfile.getById(id);
      setProfile(mapperHttpToForm(data));
      return mapperHttpToForm(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar o perfil!`,
      });
    } finally {
      loadingRef.current?.onCloseLoading();
    }
    return {};
  };

  const getAllProfiles = async () => {
    try {
      setIsLoading(true);
      const { data }: { data: TProfileHttp[] } = await apiProfile.getAll();
      return mapperHttpToTable(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar os perfis!`,
      });
    } finally {
      setIsLoading(false);
    }
    return [];
  };

  const { refetch, data: allProfiles } = useQuery({
    queryKey: ["profiles"],
    queryFn: getAllProfiles,
  });

  const deleteById = async (id: number) => {
    try {
      await apiProfile.deleteById(id);
      refetch();
      successToast({
        title: `Perfil deletado com sucesso!`,
      });
    } catch (error) {
      errorToast({
        title: `Não foi possível deletar o perfil!`,
      });
    }
  };

  useEffect(() => {
    if (idProfile) {
      getProfileById(Number(idProfile));
    }
  }, [idProfile]);

  const onSubmitHandler = async () => {
    try {
      const { getValues } = formMethods;
      setIsLoading(true);
      const { name } = getValues();
      if (profile.idProfile) {
        await apiProfile.update({
          name,
          idProfile: profile.idProfile,
        });
        successToast({
          title: `Perfil editado com sucesso!`,
        });
      } else {
        await apiProfile.insert({ name });
        successToast({
          title: `Perfil cadastrado com sucesso!`,
        });
      }
      navigate("/admin/profiles");
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
    allProfiles,
    getAllProfiles,
    profile,
    deleteById,
    isLoading,
    loadingRef,
    formMethods,
  };
};