import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { TbCalendarTime, TbCheck, TbSchool } from "react-icons/tb";

type TCardExercise = {
  title: string;
  datetime: string;
  professor: string;
  description: string;
};
export const CardExercise = ({
  title,
  datetime,
  description,
  professor,
}: TCardExercise) => {
  const [toggleConfirm, setToggleConfirm] = useState(false);

  const handleClickCheckin = () => {
    setToggleConfirm(true);
  };
  const handleClickCheckout = () => {
    setToggleConfirm(false);
  };
  return (
    <Box
      borderRadius={4}
      bgImage={"./../assets/landing-page-image.png"}
      display={"flex"}
      flexDir={"column"}
      bgSize={"cover"}
      bgPos="center"
      bgRepeat={"no-repeat"}
      color="white"
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p="10px"
      >
        <Text fontSize={"24px"} fontWeight={"bold"}>
          {title}
        </Text>
        <Text display={"flex"} gap={1} alignItems={"center"} fontSize={16}>
          <TbCalendarTime /> {datetime}
        </Text>
      </Box>
      <Box p="10px">
        <Text
          display={"flex"}
          gap={1}
          alignItems={"center"}
          fontWeight={"semibold"}
        >
          <TbSchool size={18} /> {professor}
        </Text>
        <Text fontSize={14} my="16px">
          {description}
        </Text>
      </Box>
      {toggleConfirm ? (
        <Button
          onClick={handleClickCheckout}
          w="100%"
          bg="green.400"
          gap={"10px"}
          borderTopRadius={0}
          borderBottomRadius={4}
        >
          <Text fontWeight="semibold" color="white">
            Presença Confirmada
          </Text>
          <TbCheck color="#FFF" size={24} />
        </Button>
      ) : (
        <Button
          onClick={handleClickCheckin}
          w="100%"
          _hover={{ backgroundColor: "yellow.500" }}
          bg="yellow.400"
          gap={"10px"}
          borderTopRadius={0}
          borderBottomRadius={4}
        >
          <Text fontWeight="semibold" color="black">
            Confirmar Presença
          </Text>
          <TbCheck color="#000" size={24} />
        </Button>
      )}
    </Box>
  );
};
