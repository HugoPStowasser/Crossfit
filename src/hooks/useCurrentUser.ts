import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUser";

export const useCurrentUser = () => useContext(CurrentUserContext);
