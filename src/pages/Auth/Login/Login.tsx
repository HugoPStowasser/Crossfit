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
  useMediaQuery,
} from "@chakra-ui/react";
import { memo } from "react";
import { useLogin } from "./hooks/useLogin";
import sidebarImg from "../../../assets/login-sidebar-image.jpg";
import logoImg from "../../../assets/login-logo-image.png";

const LoginComponent = () => {
  const { errors, handleSubmit, onSubmitHandler, register } = useLogin();
  const [isLargerThan720] = useMediaQuery("(min-width: 720px)");

  return (
    <HStack w="full" h="100vh">
      {isLargerThan720 && (
        <Flex w="full" h="full" borderRightWidth={1}>
          <Image objectFit="cover" w="full" h="full" src={sidebarImg} />
        </Flex>
      )}
      <Flex w="full" h="full" alignItems="center" justifyContent="center">
        <Stack pt="50px" w="full" maxWidth="md" spacing={4} p={6}>
          <Image
            objectFit="cover"
            w="150px"
            h="150px"
            src={logoImg}
            margin="auto"
          />
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
