import { Box, Divider, Text } from "@chakra-ui/react";
import { Navbar } from "../../../components/Navbar";
import { ButtonExercise } from "../../../components/ButtonExercise";
import { ClassList } from "../../../components/ClassList";
export const Home = () => {
  return (
    <>
      <Box minH="100vh" fontFamily={"Inter"}>
        <Navbar />
        <Box p="20px" gap={"20px"} display={"flex"} flexDir={"column"}>
          <Text fontWeight={"semibold"}>Aulas de Hoje:</Text>
          <ClassList />
          <Divider borderBottomWidth={"1.5px"} borderColor="gray.300" />
          <Text fontWeight={"semibold"}>Próximas aulas:</Text>
          <ClassList />
        </Box>
        <ButtonExercise />
      </Box>
    </>
  );
};
