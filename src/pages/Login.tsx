import {
  Button,
  Checkbox,
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

const Login = () => {
  const [isLargerThan720] = useMediaQuery("(min-width: 720px)");

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
          <FormControl id="user">
            <FormLabel>Usuário</FormLabel>
            <Input placeholder="Digite seu usuário" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Senha</FormLabel>
            <Input type="password" placeholder="••••••" />
          </FormControl>
          <Stack
            spacing={4}
            direction="row"
            align="start"
            justify="space-between"
          ></Stack>
          <Button color="#222" colorScheme="yellow" size="sm">
            Login
          </Button>
          <Link _hover={ {
            opacity: 0.6
          } } color="#222">Cadastrar-se</Link>
        </Stack>
      </Flex>
    </HStack>
  );
};

export { Login };
