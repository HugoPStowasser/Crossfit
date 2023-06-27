import { Box, Button, Text } from "@chakra-ui/react";
import { TbChevronDown } from "react-icons/tb";
import { CardClass } from "../CardClass";

export const ClassList = () => {
  return (
    <>
      <CardClass
        title="Aeróbico"
        description="Pequena descrição da aula de aeróbico que ocorrerá hoje. Pequena
        descrição da aula de aeróbico que ocorrerá hoje."
        datetime="18 Abril 20h30 - 22h30"
        professor="José da Silva"
      />
      <Box
        w="100%"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Button
          textAlign={"center"}
          w="100px"
          h="auto"
          p="5px"
          borderRadius={"full"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
        >
          <Text fontSize={"14px"}>Ver mais</Text>
          <TbChevronDown size={18} />
        </Button>
      </Box>
    </>
  );
};
