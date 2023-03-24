import { Outlet } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/CurrentUser";
export const App = () => {
  return (
    <CurrentUserProvider>
      <Outlet />
    </CurrentUserProvider>
  );
};
