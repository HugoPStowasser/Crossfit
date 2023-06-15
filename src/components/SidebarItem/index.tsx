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
  onClick?: () => void;
} & TextProps;

const SidebarItem = ({
  title,
  icon,
  active = false,
  onClick = () => {},
  ...props
}: TSidebarItem) => {
  return (
    <Flex flexDir="column" w="100%" alignItems={"flex-start"} onClick={onClick}>
      <Menu placement="right">
        <Link
          backgroundColor={active ? "#FFD700" : ""}
          p={3}
          _hover={{ textDecor: "none", backgroundColor: "#FFD700" }}
          w={"100%"}
        >
          <MenuButton w="100%">
            <Flex alignItems={"center"}>
              <Icon as={icon} fontSize="xl" />
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
