import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Link,
  useMediaQuery,
} from "@chakra-ui/react";
import sidebarImg from "../../assets/login-sidebar-image.jpg";
import havyworkout from "../../assets/workout-havy.jpg";

import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDir={"column"}
      h="100vh"
      w="100%"
      p="10px 30px"
    >
      <Heading>Página não encontrada.</Heading>
      <Text fontWeight="semibold" fontSize={"18px"} mt="16px">
        Esta página não existe ou está incorreta, por favor tente acessar uma
        página válida ou{" "}
        <Link
          onClick={() => navigate(-1)}
          color="blue"
          textDecoration={"underline"}
        >
          clique aqui{" "}
        </Link>
        para voltar
      </Text>
      <Image src={havyworkout} w="350px" />
    </Box>
  );
};
