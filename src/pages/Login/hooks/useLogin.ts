import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginUserFormSchema } from "../schemas/schema";
import { TLoginFormValues } from "../@types";
import { useMemo } from "react";
import { UseToastOptions, useMediaQuery, useToast } from "@chakra-ui/react";
import { TUserApi } from "../../../@types/user";
import { UserApiToHttp } from "../../../mappers/user";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { AuthService } from "../../../services/http/Auth";

export const useLogin = () => {
  const navigate = useNavigate();
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
      const { data: users } = await login();
      const user: TUserApi = users.find(
        (user: { email: String }) => user.email === formValues.email
      );
      if (!user) {
        toast(toastErrorAttributes);
        return;
      }

      setCurrentUser(UserApiToHttp(user));
      navigate("/home");
    } catch (err) {
      toast({
        ...toastErrorAttributes,
        title: `Não foi possível estabelecer conexão com o servidor`,
      });
    }
  };

  return {
    onSubmitHandler,
    register,
    handleSubmit,
    errors,
  };
};
