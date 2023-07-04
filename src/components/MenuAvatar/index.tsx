import {
  Avatar,
  Button,
  Center,
  MenuDivider,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { TbLogout } from "react-icons/tb";
import { logout } from "../../services/http/Api/axios";
import { useNavigate } from "react-router-dom";

export const MenuAvatar = () => {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoPage = (route: string) => {
    navigate(
      `/${currentUser.profile.normalizedName.toLocaleLowerCase()}/${route}`
    );
  };

  const handleClickLogout = () => {
    setIsLoading(true);
    logout().finally(() => setIsLoading(false));
  };
  return (
    <MenuList alignItems={"center"} pt="5px" mt="8px">
      <Center>
        <Avatar
          size={"2xl"}
          src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
        />
      </Center>
      <Center>
        <p>{currentUser.name}</p>
      </Center>
      <MenuDivider />
      <Button
        borderRadius={0}
        variant={"ghost"}
        width={"100%"}
        justifyContent={"start"}
        onClick={() => handleGoPage("profile")}
      >
        Perfil
      </Button>
      <Button
        borderRadius={0}
        justifyContent={"space-between"}
        variant={"ghost"}
        width={"100%"}
        isLoading={isLoading}
        onClick={handleClickLogout}
        rightIcon={<TbLogout color="red" size={20} />}
      >
        Sair
      </Button>
    </MenuList>
  );
};
