import {
  Avatar,
  Center,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { redirect } from "react-router-dom";

export const MenuAvatar = () => {
  const logout = () => {
    sessionStorage.clear();
    console.log("teste");
    window.location.reload();
  };
  return (
    <MenuList alignItems={"center"}>
      <br />
      <Center>
        <Avatar
          size={"2xl"}
          src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
        />
      </Center>
      <br />
      <Center>
        <p>Username</p>
      </Center>
      <br />
      <MenuDivider />
      <MenuItem>Perfil</MenuItem>
      <MenuItem onClick={logout}>Sair</MenuItem>
    </MenuList>
  );
};
