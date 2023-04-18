import { Button, Flex, FormControl, FormErrorMessage, HStack, Heading, Image, Input, Link, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IUserApi } from "../types/user";
import { api } from "../services/api/axios";
import { UserApiToHttp } from "../mappers/user";
import { useNavigate } from "react-router-dom";


type TFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const validationSchema = yup
  .object({
    email: yup
      .string()
      .email("É preciso inserir um e-mail válido.")
      .required("O E-mail é obrigatório."),
    password: yup
      .string()
      .min(6, "Senha mínima de 6 caracteres.")
      .required("A Senha é obrigatório."),
    confirmPassword: yup
      .string()
      .required("Senha de confirmação obrigatória.")
      .oneOf([yup.ref("password")], "Suas senhas não coincidem.")
  })
  .required();

export const SignUp = () => {
  const [isLargerThan720] = useMediaQuery("(min-width: 720px)");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandler = async (formValues: TFormValues) => {
    const { data: users } = await api.post("/createUser");

    navigate("/login");
  };

  return (
    <HStack w="full" h="100vh">
      {isLargerThan720 && (
        <Flex w="full" h="full" borderRightWidth={1}>
          <Image
            objectFit="cover"
            w="full"
            h="full"
            src="../../public/assets/LoginImage.jpg"
          />
        </Flex>
      )}
      <Flex w="full" h="full" alignItems="center" justifyContent="center">
        <Stack pt="50px" w="full" maxWidth="md" spacing={4} p={6}>
          <Image
            objectFit="cover"
            w="150px"
            h="150px"
            src="../../public/assets/MobileLogo.png"
            margin="auto"
          />
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <FormControl id="email" mt="6">
              <Input {...register("email")} placeholder="E-mail" />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="password" mt="5">
              <Input
                autoComplete="off"
                type="password"
                placeholder="Senha"
                {...register("password")}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="confirmPassword" mt="4">
              <Input
                autoComplete="off"
                type="password"
                placeholder="Confirme sua senha"
                {...register("confirmPassword")}
              />
              <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
            </FormControl>
            <Stack
              spacing={4}
              direction="row"
              align="start"
              justify="space-between"
            ></Stack>
            <Button
              color="#222"
              colorScheme="yellow"
              size="md"
              w="100%"
              mt="5"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Stack>
      </Flex>
    </HStack>
  );
};
