import { Box, Divider, Text } from "@chakra-ui/react";
import { ButtonExercise } from "../../../components/ButtonExercise";
import { ClassList } from "./components/ClassList";
import { useHome } from "./hooks/useHome";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { TbAlertOctagon } from "react-icons/tb";
export const Home = () => {
  const { allClasses } = useHome();
  const { block } = useCurrentUser();
  return (
    <>
      <>
        {block.isBlocked && (
          <Box
            p="20px"
            mb="15px"
            w="100%"
            bg="red.300"
            display={"flex"}
            alignItems={"center"}
          >
            <TbAlertOctagon size={22} />
            <Text ml="10px">{block.blockDescription}</Text>
          </Box>
        )}
        <Box p="20px" gap={"20px"} display={"flex"} flexDir={"column"}>
          {allClasses?.classesToday && allClasses?.classesToday.length > 0 && (
            <>
              <Text fontWeight={"semibold"}>Aulas de Hoje:</Text>
              <ClassList classesData={allClasses?.classesToday} />
            </>
          )}
          <Divider borderBottomWidth={"1.5px"} borderColor="gray.300" />
          {allClasses?.classesAfterToday &&
          allClasses?.classesAfterToday.length > 0 ? (
            <>
              <Text fontWeight={"semibold"}>Próximas aulas:</Text>
              <ClassList classesData={allClasses?.classesAfterToday} />
            </>
          ) : (
            <Text fontWeight={"semibold"}>
              Não há aulas cadastradas no momento.
            </Text>
          )}
        </Box>
      </>
      <ButtonExercise />
    </>
  );
};
