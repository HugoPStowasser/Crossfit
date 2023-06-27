import { Box, Button, Link, Spinner, Text } from "@chakra-ui/react";
import { CardClass } from "../../../../components/CardClass";
import dayjs from "dayjs";
import { TbList } from "react-icons/tb";
import { useDashboard } from "../hooks/useDashboard";
import { useNavigate } from "react-router-dom";

export const NextClassesInfo = () => {
  const { allClasses, classesIsLoading } = useDashboard();
  const navigate = useNavigate();
  if (classesIsLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Box
        w="100%"
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
        mb="24px"
      >
        <Text fontWeight={"semibold"}>Próximas aulas</Text>
        <Link
          fontSize={"14px"}
          _hover={{
            backgroundColor: "black",
            color: "white",
          }}
          p="2px 5px"
          bg="yellow.400"
          borderRadius={4}
          color="black"
          fontWeight={"semibold"}
          href="class/create"
        >
          Criar Aula
        </Link>
      </Box>
      <Box display="flex" flexDir={"column"} gap={2}>
        {allClasses?.map((item) => (
          <CardClass
            key={item.idClass}
            title={item.name}
            description={item.description}
            datetime={`${dayjs(item.date, "DD/MM/YYYY").format("D [de] MMMM")}
               ${item.startHour} - ${item.endHour}`}
            professor={item.professor}
            withCheckinButton={false}
          />
        ))}
      </Box>
      <Button
        mt="16px"
        w="100%"
        leftIcon={<TbList size={18} />}
        onClick={() => navigate("/admin/class")}
      >
        Todas as Aulas
      </Button>
    </>
  );
};
