import { Box, Button, Text } from "@chakra-ui/react";
import { TitleWithBackButton } from "../TitleWithBackButton";
import { TbSquareRoundedPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

type THeaderWithTitle = {
  title: string;
  createRoute: string;
};
export const HeaderWithTitle = ({ title, createRoute }: THeaderWithTitle) => {
  const navigate = useNavigate();
  const handleGoToCreatePage = () => {
    navigate(createRoute);
  };
  return (
    <Box
      my="20px"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      px="15px"
    >
      <TitleWithBackButton title={`Gerenciar ${title}s`} />
      <Button
        onClick={handleGoToCreatePage}
        display={"flex"}
        alignItems={"center"}
        _hover={{ backgroundColor: "yellow.400", color: "black" }}
        bg="blackAlpha.900"
        color="whiteAlpha.900"
        leftIcon={<TbSquareRoundedPlus size={20} />}
      >
        <Text>Adicionar {title}</Text>
      </Button>
    </Box>
  );
};
