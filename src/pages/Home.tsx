import { useCurrentUser } from "../hooks/useCurrentUser";

export const HomePage = () => {
  const { currentUser } = useCurrentUser();
  return (
    <div>
      <h1>Seja Bem-Vindo, {currentUser.email}</h1>
    </div>
  );
};
