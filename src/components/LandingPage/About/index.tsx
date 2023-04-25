import { Box, Text } from "@chakra-ui/react";

const AboutComponent = () => {
  return (
    <Box margin="50px 0" px="30px" fontFamily={"Inter"} id="about">
      <Text fontSize={"24px"} fontWeight={"700"} letterSpacing={".01em"}>
        Sobre
      </Text>
      <Text fontSize={"16px"} letterSpacing={"2px"} mt="20px">
        Proin feugiat, ipsum vitae semper tempus, lorem quam cursus nisi, ut
        efficitur nibh orci quis est. Integer leo lectus, ornare a justo vel,
        varius tristique nulla. Vestibulum euismod, lorem tincidunt maximus
        blandit, turpis purus placerat quam, quis eleifend orci mi sit amet
        sapien. Nam nulla sem, venenatis nec ultricies eget, faucibus in magna.
        Phasellus faucibus augue neque. Proin dapibus nisl quam, sed vestibulum
        orci blandit vitae.
        <br />
        <br />
        Proin feugiat, ipsum vitae semper tempus, lorem quam cursus nisi, ut
        efficitur nibh orci quis est. Integer leo lectus, ornare a justo vel,
        varius tristique nulla.
      </Text>
    </Box>
  );
};

export const About = AboutComponent;
