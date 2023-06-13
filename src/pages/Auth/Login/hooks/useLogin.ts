import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginUserFormSchema } from "../schemas/schema";
import { TLoginFormValues, TLoginResponse } from "../@types";
import { useMemo, useState } from "react";
import { UseToastOptions, useMediaQuery, useToast } from "@chakra-ui/react";
import { UserApiToHttp } from "../../../../mappers/user";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { AuthService } from "../../../../services/http/Auth";

import { redirectUserAuthenticatedHandler } from "../../../../functions";

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useCurrentUser();
  const [isLargerThan720] = useMediaQuery("(min-width: 720px)");
  const toast = useToast();

  const toastErrorAttributes: UseToastOptions = useMemo(
    () => ({
      title: `Usuário não encontrado!`,
      status: "error",
      isClosable: true,
      duration: 2000,
      position: isLargerThan720 ? "top" : "bottom",
    }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(loginUserFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = AuthService();
  const onSubmitHandler = async (formValues: TLoginFormValues) => {
    try {
      setIsLoading(true);
      const { data }: { data: TLoginResponse } = await login(
        formValues.email,
        formValues.password
      );
      const { user } = data;

      if (!user) {
        toast(toastErrorAttributes);
        return;
      }

      setCurrentUser(UserApiToHttp(user));
      localStorage.setItem(`@Token`, data.token);
      localStorage.setItem(`@User`, JSON.stringify(user));

      const path = redirectUserAuthenticatedHandler({
        normalizedName: user.profile.normalizedName,
      });
      navigate(path);
    } catch (err) {
      console.error(err);
      toast({
        ...toastErrorAttributes,
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
    isLoading,
  };
};
