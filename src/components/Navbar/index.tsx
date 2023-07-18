import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  Stack,
} from "@chakra-ui/react";
import { MenuSidebar } from "../MenuSidebar";
import { MenuAvatar } from "../MenuAvatar";

export const Navbar = () => {
  return (
    <Box bg={"black"} px={4}>
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
                    "https://w7.pngwing.com/pngs/184/113/png-transparent-user-profile-computer-icons-profile-heroes-black-silhouette-thumbnail.png"
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
