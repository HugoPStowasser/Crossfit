import { Link } from "@chakra-ui/react";
import { BsWhatsapp } from "react-icons/bs";

const WhatsappButtonComponent = () => {
  return (
    <Link
      position={"fixed"}
      bottom="30px"
      right={"35px"}
      borderRadius={"50%"}
      padding="15px"
      boxShadow={"dark-lg"}
      _hover={{ opacity: 0.8 }}
      transition={"all 0.2s ease"}
      backgroundColor="#FFBB00"
      target="_blank"
      href="http://wa.me/5521998822524"
    >
      <BsWhatsapp fontSize={"32px"} />
    </Link>
  );
};

export const WhatsappButton = WhatsappButtonComponent;
