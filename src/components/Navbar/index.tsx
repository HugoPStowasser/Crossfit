import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  Center,
} from "@chakra-ui/react";
import { MenuSidebar } from "../MenuSidebar";
import { MenuAvatar } from "../MenuAvatar";

export const Navbar = () => {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <MenuSidebar />

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                />
              </MenuButton>
              <MenuAvatar />
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};
