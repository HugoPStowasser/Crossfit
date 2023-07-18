import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { TbCalendarTime, TbCheck, TbSchool, TbUserCheck } from "react-icons/tb";

type TCardClass = {
  title: string;
  datetime: string;
  professor: string;
  description: string;
  withcheckInButton?: boolean;
  checkIn?: boolean;
  confirmedStudentsLentgh?: number;
  onClick?: () => void;
  checkInFn?: () => Promise<boolean>;
  checkoutFn?: () => Promise<boolean>;
};
export const CardClass = ({
  title,
  datetime,
  description,
  professor,
  withcheckInButton = true,
  checkIn = false,
  confirmedStudentsLentgh,
  onClick = async () => {},
  checkInFn = async () => true,
  checkoutFn = async () => true,
}: TCardClass) => {
  const [toggleConfirm, setToggleConfirm] = useState(checkIn);

  const handleClickcheckIn = () => {
    setToggleConfirm(true);
    checkInFn().then((res) => {
      if (!res) {
        setToggleConfirm(false);
      }
    });
  };
  const handleClickCheckout = () => {
    setToggleConfirm(false);
    checkoutFn().then((res) => {
      if (!res) {
        setToggleConfirm(true);
      }
    });
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
      cursor={onClick !== undefined ? "pointer" : "default"}
      onClick={onClick}
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
        {confirmedStudentsLentgh && confirmedStudentsLentgh > 0 ? (
          <Text
            fontSize={14}
            my="16px"
            display={"flex"}
            alignItems={"center"}
            gap={1}
          >
            <Text display={"flex"} alignItems={"center"} gap={2}>
              <TbUserCheck />
              <Text>Alunos Confirmados:</Text>
            </Text>
            {confirmedStudentsLentgh}
          </Text>
        ) : null}
      </Box>
      {withcheckInButton && (
        <>
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
              onClick={handleClickcheckIn}
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
        </>
      )}
    </Box>
  );
};
