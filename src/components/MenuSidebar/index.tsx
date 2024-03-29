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
  TbLogout
} from "react-icons/tb";
import { SidebarItem } from "../SidebarItem";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../services/http/Api/axios";

export const MenuSidebar = () => {
  const { isAdmin, currentUser } = useCurrentUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleGoHome = () => {
    if (isAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate("/student/home");
    }
  };

  const handleGoPage = (route: string) => {
    navigate(
      `/${currentUser.profile.normalizedName.toLocaleLowerCase()}/${route}`
    );
    onClose();
  };

  const handleClickLogout = () => {
    setIsLoading(true);
    logout().finally(() => setIsLoading(false));
  };
  
  return (
    <Box>
      <TbMenu2
        size={32}
        onClick={onOpen}
        color="#ECC94B"
        style={{ cursor: "pointer" }}
      />
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
                <SidebarItem
                  icon={TbCalendar}
                  title="Aulas"
                  active={pathname.includes("class")}
                  onClick={() => handleGoPage("class")}
                />
                <SidebarItem
                  icon={TbUsers}
                  title="Usuários"
                  active={pathname.includes("user")}
                  onClick={() => handleGoPage("user")}
                />
                <SidebarItem
                  icon={TbFileInvoice}
                  title="Pagamentos"
                  active={pathname.includes("payment")}
                  onClick={() => handleGoPage("payment")}
                />
                <SidebarItem
                  icon={TbBarbell}
                  title="Exercícios"
                  active={pathname.includes("exercise")}
                  onClick={() => handleGoPage("exercise")}
                />
                <SidebarItem
                  icon={TbCircleDashed}
                  title="Status"
                  active={pathname.includes("status")}
                  onClick={() => handleGoPage("status")}
                />
                <SidebarItem
                  icon={TbLockOpen}
                  title="Perfis"
                  active={pathname.includes("profile")}
                  onClick={() => handleGoPage("profile")}
                />
                <SidebarItem
                  icon={TbGenderAndrogyne}
                  title="Gêneros"
                  active={pathname.includes("gender")}
                  onClick={() => handleGoPage("gender")}
                />
                <SidebarItem
                  icon={TbPigMoney}
                  title="Tipo de Pagamento"
                  active={pathname.includes("paymentType")}
                  onClick={() => handleGoPage("paymentType")}
                />
                <SidebarItem
                  icon={TbDeviceImac}
                  title="Página de visitação"
                  active={pathname.includes("visit-page")}
                />
                <SidebarItem
                  icon={TbLogout}
                  title="Sair"
                  active={pathname.includes("logout")}
                  onClick={() => handleClickLogout()}
                />
              </>
            ) : (
              <>
                <SidebarItem
                  icon={TbBarbell}
                  title="Registrar Exercício"
                  active={pathname.includes("register-points")}
                />
                <SidebarItem
                  icon={TbPigMoney}
                  title="Cobranças"
                  active={pathname.includes("invoices")}
                />
                <SidebarItem
                  icon={TbTrophy}
                  title="Ranking"
                  active={pathname.includes("ranking")}
                />
                <SidebarItem
                  icon={TbUser}
                  title="Perfil"
                  active={pathname.includes("student/profile")}
                />
                <SidebarItem
                  icon={TbLogout}
                  title="Sair"
                  active={pathname.includes("logout")}
                  onClick={() => handleClickLogout()}
                />
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
