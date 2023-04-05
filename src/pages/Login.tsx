import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
type TFormValues = {
  email: string;
  password: string;
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("É preciso inserir um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: yup
    .string()
    .min(6, "Senha mínima de 6 caracteres")
    .required("Required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useCurrentUser();
  const [isLargerThan720] = useMediaQuery("(min-width: 720px)");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>({ resolver: yupResolver(validationSchema) });

  const onSubmitHandler = (formValues: TFormValues) => {
    console.log(formValues);
  };

  // // const s = useCallback(() => {
  // //   // TODO: Validation here, request api
  // //   console.log(email);
  // //   if (email !== "" && password !== "") {
  // //     setCurrentUser({
  // //       name: "Paulo",
  // //       id: 1,
  // //       email,
  // //       perfil: "STUDENT",
  // //     });
  // //     navigate("/home");
  // //   }
  // // }, [email, password]);

  return (
    <HStack w="full" h="100vh">
      {isLargerThan720 && (
        <Flex w="full" h="full" borderRightWidth={1}>
          <Image
            objectFit="cover"
            w="full"
            h="full"
            src="https://i.imgur.com/2vWzkiq.jpg"
          />
        </Flex>
      )}
      <Flex w="full" h="full" alignItems="center" justifyContent="center">
        <Stack pt="50px" w="full" maxWidth="md" spacing={4} p={6}>
          {!isLargerThan720 && (
            <Image
              objectFit="cover"
              w="150px"
              h="150px"
              src="https://i.imgur.com/wdc7IwB.png"
              margin="auto"
            />
          )}
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Heading fontSize="2xl" color="#222">
              Faça seu login
            </Heading>
            <FormControl id="email" mt="6">
              <Input placeholder="E-mail" {...register("email")} />
              <p>{errors.email?.message}</p>
            </FormControl>
            <FormControl id="password" mt="5">
              <Input
                type="password"
                placeholder="Senha"
                {...register("email")}
              />
              <p>{errors.password?.message}</p>
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
              type="submit"
              w="100%"
              mt="5"
            >
              Login
            </Button>
          </form>
          <Link
            textTransform={"none"}
            cursor={"default "}
            _hover={{
              textTransform: "none",
            }}
            color="#222"
            display={"flex"}
            gap={2}
            w="100%"
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            Não possui conta?{" "}
            <Text color="blue" _hover={{ opacity: 0.6 }} cursor={"pointer"}>
              Cadastrar-se
            </Text>
          </Link>
        </Stack>
      </Flex>
    </HStack>
  );
};

export { Login };
