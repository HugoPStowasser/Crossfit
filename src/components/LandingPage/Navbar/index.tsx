import { Box, Image, Link, Text, useMediaQuery } from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";

type LinkNavBarProps = {
  text: String;
  _id: String;
};
const LinkNavBar = ({ text, _id }: LinkNavBarProps) => {
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      transition="all 0.3s ease"
      color="#FFF"
      _hover={{
        textDecoration: "none",
        opacity: 0.7,
        color: "#FFBB00 !important",
      }}
      href={`#${_id}`}
    >
      <Text fontFamily="Inter" fontWeight={500}>
        {text}
      </Text>
    </Link>
  );
};

const NavbarComponent = () => {
  const [isLargerThan720] = useMediaQuery("(min-width: 720px)");
  return (
    <Box
      position={"fixed"}
      width={"100%"}
      backgroundColor={"#000"}
      px={7}
      py={3}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      h="70px"
    >
      <Image
        objectFit="cover"
        w="45px"
        h="45px"
        src="./assets/crossfit-logo.png"
      />
      <Box display={"flex"} gap={4} ml="60px">
        <LinkNavBar text="Início" _id="start" />
        <LinkNavBar text="Sobre" _id="about" />
        <LinkNavBar text="Contato" _id="contact" />
      </Box>

      <Link
        backgroundColor="#FFBB00"
        borderRadius={8}
        display="flex"
        alignItems={"center"}
        gap={3}
        px={2}
        py={1}
        rounded={"md"}
        transition="all 0.3s ease"
        _hover={{
          textDecoration: "none",
          opacity: 0.7,
        }}
        href={"/login"}
      >
        <BsFillPersonFill size={24} color="#000" />
        {isLargerThan720 && (
          <Text fontFamily="Inter" color="#000" fontWeight={500}>
            Espaço do Cliente
          </Text>
        )}
      </Link>
    </Box>
  );
};

export const Navbar = NavbarComponent;
