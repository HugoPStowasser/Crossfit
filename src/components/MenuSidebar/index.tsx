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
import {
  TbBarbell,
  TbCalendar,
  TbCircleDashed,
  TbDeviceImac,
  TbFileInvoice,
  TbGenderAndrogyne,
  TbLockOpen,
  TbMenu2,
  TbPigMoney,
  TbTrophy,
  TbUser,
  TbUsers,
} from "react-icons/tb";
import { SidebarItem } from "../SidebarItem";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useNavigate, useNavigation } from "react-router-dom";

export const MenuSidebar = () => {
  const { isAdmin } = useCurrentUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const navigate = useNavigate();

  const handleGoHome = () => {
    if (isAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate("/student/home");
    }
  };
  return (
    <Box>
      <Button ref={btnRef.current} onClick={onOpen} bg="yellow.400">
        <TbMenu2 color={"#000"} size={24} />
      </Button>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            onClick={handleGoHome}
            cursor={"pointer"}
          >
            Gladius Crossfit
          </DrawerHeader>
          <DrawerBody
            p="0"
            display={"flex"}
            flexDir="column"
            alignItems={"flex-start"}
          >
            {isAdmin ? (
              <>
                <SidebarItem icon={TbCalendar} title="Aulas" />
                <SidebarItem icon={TbUsers} title="Usuários" />
                <SidebarItem icon={TbFileInvoice} title="Pagamentos" />
                <SidebarItem icon={TbBarbell} title="Exercícios" />
                <SidebarItem icon={TbCircleDashed} title="Status" />
                <SidebarItem icon={TbLockOpen} title="Perfis" />
                <SidebarItem icon={TbGenderAndrogyne} title="Gêneros" />
                <SidebarItem icon={TbPigMoney} title="Tipo de Pagamento" />
                <SidebarItem icon={TbDeviceImac} title="Página de visitação" />
              </>
            ) : (
              <>
                <SidebarItem icon={TbUser} title="Perfil" />
                <SidebarItem icon={TbPigMoney} title="Cobranças" />
                <SidebarItem icon={TbTrophy} title="Ranking" />
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
