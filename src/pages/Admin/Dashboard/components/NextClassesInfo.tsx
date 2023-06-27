import { Box, Button, Link, Spinner, Text } from "@chakra-ui/react";
import { CardClass } from "../../../../components/CardClass";
import { useClass } from "../../Class/hooks/useClass";
import dayjs from "dayjs";
import { TbList } from "react-icons/tb";

export const NextClassesInfo = () => {
  const { allClasses, isLoading } = useClass();

  if (isLoading) {
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
          bg="yellow.500"
          borderRadius={4}
          color="black"
          fontWeight={"semibold"}
          href="class/create"
        >
          Criar Aula
        </Link>
      </Box>
      <Box display="flex" flexDir={"column"} gap={2}>
        {allClasses
          ?.slice(0, 2)
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .map((item) => (
            <CardClass
              key={item.idClass}
              title={item.name}
              description={item.description}
              // datetime="18 Abril 20h30 - 22h30"
              datetime={`${dayjs(item.date, "DD/MM/YYYY").format("D [de] MMMM")}
               ${item.startHour} - ${item.endHour}`}
              professor={item.professor}
              withCheckinButton={false}
            />
          ))}
      </Box>
      <Button mt="16px" w="100%" leftIcon={<TbList size={18} />}>
        Todas as Aulas
      </Button>
    </>
  );
};
