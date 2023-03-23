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
  Stack,
  useMediaQuery
} from "@chakra-ui/react";

const Login = () => {
  const [isLargerThan720] = useMediaQuery('(min-width: 720px)')

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
        <Stack w="full" maxWidth="md" spacing={4} p={6}>
          <Heading fontSize="2xl" color="#222">
            Faça seu login na Gladius
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
          >
            <Checkbox colorScheme="yellow">Lembrar-me</Checkbox>
          </Stack>
          <Button color="#222" colorScheme="yellow" size="sm">
            Login
          </Button>
        </Stack>
      </Flex>
    </HStack>
  );
};

export { Login };
