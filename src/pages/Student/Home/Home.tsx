import { Box, Button, Text } from "@chakra-ui/react";
import { Navbar } from "../../../components/Navbar";
import { AiOutlineCheckCircle } from "react-icons/ai";
export const Home = () => {
  return (
    <Box>
      <Navbar />
      <Box p="20px" gap={"20px"} display={"flex"} flexDir={"column"}>
        <Box borderRadius={4} display={"flex"} flexDir={"column"} bg="gray.200">
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            p="10px"
          >
            <Text>Aeróbico</Text>
            <Text>18ABR 20h30 - 22h30</Text>
          </Box>
          <Box p="10px">
            <Text>
              Pequena descrição da aula de aeróbico que ocorrerá hoje.
            </Text>
            <Text>Professor: José da Silve</Text>
          </Box>
          <Button w="100%" bg="gray.500" gap={"10px"}>
            <Text>Check-in</Text>
            <AiOutlineCheckCircle color="green" size={24} />
          </Button>
        </Box>
        <Box borderRadius={4} display={"flex"} flexDir={"column"} bg="gray.200">
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            p="10px"
          >
            <Text>Aeróbico</Text>
            <Text>18ABR 20h30 - 22h30</Text>
          </Box>
          <Box p="10px">
            <Text>
              Pequena descrição da aula de aeróbico que ocorrerá hoje.
            </Text>
            <Text>Professor: José da Silve</Text>
          </Box>
          <Button w="100%" bg="gray.500" gap={"10px"}>
            <Text>Check-in</Text>
            <AiOutlineCheckCircle color="green" size={24} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
