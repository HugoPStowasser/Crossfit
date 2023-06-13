import React from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { TbMenu2, TbUsers } from "react-icons/tb";
import { SidebarItem } from "../SidebarItem";
import { AiOutlineTrophy } from "react-icons/ai";

export const MenuSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Box>
      <Button ref={btnRef.current} onClick={onOpen} bg="yellow.400">
        <TbMenu2 color={"#000"} size={24} />
      </Button>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Gladius Crossfit</DrawerHeader>
          <DrawerBody
            p="0"
            display={"flex"}
            flexDir="column"
            alignItems={"flex-start"}
          >
            <SidebarItem icon={TbUsers} title="Gerenciar Perfil" />
            <SidebarItem icon={AiOutlineTrophy} title="Gerenciar Usuário" />
            <SidebarItem icon={AiOutlineTrophy} title="Gerenciar Faturas" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
