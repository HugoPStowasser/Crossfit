import {
  Avatar,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FiHome, FiMenu } from "react-icons/fi";
import { MdOutlinePlayLesson } from "react-icons/md";
import { AiOutlineTrophy } from "react-icons/ai";
import { useState } from "react";
import { NavItem } from "./NavItem";
import { useCurrentUser } from "../hooks/useCurrentUser";

const Sidebar = () => {
  const [navSize, setNavSize] = useState("large");
  const { currentUser } = useCurrentUser();

  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      mt="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          aria-label={"Menu"}
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == "small") {
              setNavSize("large");
            } else {
              setNavSize("small");
            }
          }}
        />
        <NavItem navSize={navSize} icon={FiHome} title="Dashboard" />
        <NavItem navSize={navSize} icon={MdOutlinePlayLesson} title="Aulas" />
        <NavItem navSize={navSize} icon={AiOutlineTrophy} title="Recordes" />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
          <Avatar size="sm" src="https://i.imgur.com/JDjDfYw.jpg" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm">
              {currentUser?.name}
            </Heading>
            <Text color="gray">{currentUser?.profile?.name}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { Sidebar };
