import { Button, ButtonProps } from "@chakra-ui/react";
import { TbBarbell } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
export const ButtonExercise = ({ ...props }: ButtonProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/student/register-points");
  };

  return (
    <Button
      onClick={handleClick}
      boxShadow={"xl"}
      bg="yellow.400"
      _hover={{ backgroundColor: "yellow.500" }}
      position={"absolute"}
      right={"5%"}
      bottom={"10%"}
      width={"64px"}
      height={"64px"}
      display="flex"
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"50%"}
      variant={"unstyled"}
      {...props}
    >
      <TbBarbell size={32} />
    </Button>
  );
};
