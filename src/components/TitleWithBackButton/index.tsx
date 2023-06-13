import { Box, Heading } from "@chakra-ui/react";
import { TbCircleArrowLeft } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const TitleWithBackButton = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  const handleBackRoute = () => {
    navigate(-1);
  };

  return (
    <Box display={"flex"} alignItems={"center"} gap={3}>
      <TbCircleArrowLeft
        size={32}
        onClick={handleBackRoute}
        cursor={"pointer"}
      />
      <Heading fontSize={"32px"} mt="-3px">
        {title}
      </Heading>
    </Box>
  );
};
