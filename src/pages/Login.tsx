import {
  Button,
  Flex,
  FormControl,
  HStack,
  Image,
  Input,
  Link,
  Stack,
  Text,
  UseToastOptions,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { memo, useMemo } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserApiToHttp } from "../mappers/user";
import { IUserApi } from "../types/user";
import { api } from "../services/api/axios";
import { z } from "zod";

const loginUserFormSchema = z.object({
  email: z
    .string()
    .nonempty("O E-mail é obrigatório.")
    .email("É preciso inserir um e-mail válido."),
  password: z
    .string()
    .min(6, "Senha mínima de 6 caracteres.")
    .nonempty("A Senha é obrigratório."),
});

type TFormValues = z.infer<typeof loginUserFormSchema>;

const LoginComponent = () => {
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
  } = useForm<TFormValues>({
    resolver: zodResolver(loginUserFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandler = async (formValues: TFormValues) => {
    try {
      const { data: users } = await api.get("/user");
      const user: IUserApi = users.find(
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
          <Image
            objectFit="cover"
            w="150px"
            h="150px"
            src="https://i.imgur.com/wdc7IwB.png"
            margin="auto"
          />
          <Text>{errors.email?.message}</Text>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <FormControl id="email" mt="6">
              <Input {...register("email")} placeholder="E-mail" />
              {errors.email && (
                <Text color="red.500" fontSize={"sm"} pt="5px">
                  {errors.email?.message}
                </Text>
              )}
            </FormControl>
            <FormControl id="password" mt="5">
              <Input
                {...register("password")}
                autoComplete="off"
                type="password"
                placeholder="Senha"
              />
              <Text color="red.500" fontSize={"sm"} pt="5px">
                {errors.password?.message}
              </Text>
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
          <Text
            textTransform={"none"}
            cursor={"default "}
            _hover={{
              textTransform: "none",
            }}
            color="#222"
            display={"flex"}
            gap={2}
            w="100%"
            justifyContent={"center"}
            alignItems={"center"}
          >
            Não possui conta?{" "}
            <Link
              color="blue.600"
              _hover={{ opacity: 0.6 }}
              cursor={"pointer"}
              href="/sign-up"
            >
              Cadastrar-se
            </Link>
          </Text>
        </Stack>
      </Flex>
    </HStack>
  );
};

export const Login = memo(LoginComponent);
