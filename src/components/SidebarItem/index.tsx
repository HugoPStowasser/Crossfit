import {
  Flex,
  Link,
  Menu,
  MenuButton,
  Text,
  Icon,
  TextProps,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

type TSidebarItem = {
  title: string;
  icon: IconType;
  active?: boolean;
} & TextProps;

const SidebarItem = ({
  title,
  icon,
  active = false,
  ...props
}: TSidebarItem) => {
  return (
    <Flex flexDir="column" w="100%" alignItems={"flex-start"}>
      <Menu placement="right">
        <Link
          backgroundColor={active ? "#FFD700" : ""}
          p={3}
          _hover={{ textDecor: "none", backgroundColor: "#FFD700" }}
          w={"100%"}
        >
          <MenuButton w="100%">
            <Flex alignItems={"center"}>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "#FFD700" : "gray.500"}
              />
              <Text ml={5} {...props}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};

export { SidebarItem };
