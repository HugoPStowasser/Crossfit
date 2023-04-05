import { Sidebar } from "../components/Sidebar";
import { useCurrentUser } from "../hooks/useCurrentUser";

export const HomePage = () => {
  const { currentUser } = useCurrentUser();
  return (
    <>
      <Sidebar />
      {`Seja Bem-vindo, ${currentUser.name} - ${currentUser.profile.name}`}
    </>
  );
};
