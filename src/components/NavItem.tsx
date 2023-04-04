import { Flex, Link, Menu, MenuButton, Text, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

type TNavItem = {
  navSize: string;
  title: string;
  icon: IconType;
  active?: boolean;
};

const NavItem = ({ navSize, title, icon, active = false }: TNavItem) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active ? "#FFD700" : ""}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#FFD700" }}
          w={navSize == "large" ? "100%" : "45px"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "#FFD700" : "gray.500"}
              />
              <Text ml={5} display={navSize == "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};

export { NavItem };
