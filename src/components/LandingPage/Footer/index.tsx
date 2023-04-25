import { Box, Icon as IconChakra, Text } from "@chakra-ui/react";
import { RiInstagramFill, RiTwitterFill, RiFacebookFill } from "react-icons/ri";

import { IconType } from "react-icons/lib";

const Icon = ({ icon }: { icon: IconType }) => {
  return (
    <IconChakra
      as={icon}
      fontSize={"32px"}
      cursor={"pointer"}
      _hover={{ color: "#FFBB00" }}
      transition="all 0.3s ease"
    />
  );
};

const FooterComponent = () => {
  return (
    <Box
      id="contact"
      backgroundColor="#000"
      px="30px"
      py="30px"
      display="flex"
      flexDir={"column"}
      color="#B2B2B2"
      gap={4}
    >
      <Text fontSize="24px" fontWeight="700" color="#FFF">
        Contato
      </Text>
      <Text fontSize="18px" mt="15px">
        +55 21 9999-9999
      </Text>
      <Text fontSize="18px">contato@crossfit.com</Text>
      <Box backgroundColor="#111111" opacity={0.7} h="2px" w="100%" />
      <Text fontSize="18px">Rua ali Perto, 42 - Niterói</Text>
      <Text fontSize="18px">Rio de Janeiro - RJ</Text>
      <Box backgroundColor="#111111" opacity={0.7} h="2px" w="100%" />
      <Box display={"flex"} alignItems={"center"} gap={5} color="#FFF">
        <Icon icon={RiFacebookFill} />
        <Icon icon={RiTwitterFill} />
        <Icon icon={RiInstagramFill} />
      </Box>
    </Box>
  );
};
export const Footer = FooterComponent;
