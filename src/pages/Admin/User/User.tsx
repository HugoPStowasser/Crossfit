import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { TitleWithBackButton } from "../../../components/TitleWithBackButton";
import { TbChevronDown, TbLock, TbSchool, TbUserPlus } from "react-icons/tb";
import { UserTable } from "./Table";

export const User = () => {
  return (
    <Box>
      <Box
        my="20px"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        px="15px"
      >
        <TitleWithBackButton title="Gerenciar Usuários" />
        <Menu>
          <MenuButton
            as={Button}
            display={"flex"}
            alignItems={"center"}
            _hover={{ backgroundColor: "yellow.400", color: "black" }}
            _active={{ backgroundColor: "yellow.400", color: "black" }}
            bg="blackAlpha.900"
            color="whiteAlpha.900"
            rightIcon={<TbChevronDown />}
          >
            <Text>Adicionar Usuário</Text>
          </MenuButton>
          <MenuList>
            <MenuItem display={"flex"} alignItems={"center"} gap={2}>
              <TbLock size={20} /> <Text>Administrador</Text>
            </MenuItem>
            <MenuItem display={"flex"} alignItems={"center"} gap={2}>
              <TbUserPlus size={20} /> <Text>Estudante</Text>
            </MenuItem>
            <MenuItem display={"flex"} alignItems={"center"} gap={2}>
              <TbSchool size={20} /> <Text>Professor</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <UserTable />
    </Box>
  );
};
