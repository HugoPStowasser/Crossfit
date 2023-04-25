import { Box, Text } from "@chakra-ui/react";
import { Navbar } from "../components/LandingPage/Navbar";
import { About } from "../components/LandingPage/About";
import { Footer } from "../components/LandingPage/Footer";
import { WhatsappButton } from "../components/LandingPage/WhatsappButton";
export const LandingPage = () => {
  return (
    <Box fontSize={"Inter"} id="start">
      <Navbar />
      <Box
        backgroundImage={"./assets/landing-page-image.png"}
        backgroundRepeat={"no-repeat"}
        backgroundPosition={"center"}
        backgroundSize={"cover"}
        h="100vh"
        display={"flex"}
        flexDir={"column"}
        fontFamily={"Inter"}
        alignItems={"flex-start"}
        justifyContent={"flex-end"}
        padding="30px"
      >
        <Text
          fontSize={"64px"}
          letterSpacing={".01em"}
          fontWeight={"700"}
          color="white"
        >
          Neque porro quisquam est
        </Text>
        <Text fontSize={"16px"} color="white" mt="15px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          faucibus lectus ligula, quis cursus ipsum consectetur eget. Vestibulum
          rhoncus ipsum eget turpis iaculis
        </Text>
      </Box>
      <About />
      <Box w="100%">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.398061147092!2d-43.194051023889045!3d-22.93556277923481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997fdf2d8b343b%3A0xc999eb3e5854ab39!2sKlaus%20Laranjeiras!5e0!3m2!1spt-PT!2sbr!4v1682391984244!5m2!1spt-PT!2sbr"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          width="100%"
          height="300px"
          style={{ border: 0 }}
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
        ></iframe>
      </Box>
      <Footer />
      <WhatsappButton />
    </Box>
  );
};
