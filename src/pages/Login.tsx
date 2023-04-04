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
  useMediaQuery,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";
import {useForm, Resolver} from "react-hook-form"

type FormValues = {
  name: string;
  id: number;
  email: string;
  perfil: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
        name: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  };
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useCurrentUser();
  const [isLargerThan720] = useMediaQuery("(min-width: 720px)");

  const { register, handleSubmit } = useForm();
  const onSubmit = useCallback((formValues: FormValues) => {
    console.log(formValues);
  }, []);

  const handleSend = useCallback(() => {
    // TODO: Validation here, request api
    console.log(email);
    if (email !== "" && password !== "") {
      setCurrentUser({
        name: "Paulo",
        id: 1,
        email,
        perfil: "STUDENT",
      });
      navigate("/home");
    }
  }, [email, password]);

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
          <Heading fontSize="2xl" color="#222">
            Faça seu login
          </Heading>
          <FormControl id="email">
            <FormLabel>E-mail</FormLabel>
            <Input
              placeholder="Digite sua senha"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
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
            size="sm"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Link
            _hover={{
              opacity: 0.6,
            }}
            color="#222"
          >
            Cadastrar-se
          </Link>
        </Stack>
      </Flex>
    </HStack>
  );
};

export { Login };
