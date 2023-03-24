import { createContext, ReactNode, useState } from "react";

type TCurrentUserProviderProps = {
  children: ReactNode;
};

type TUser = {
  id: Number;
  email: String;
  name: String;
  perfil: "ADMIN" | "STUDENT";
};

type TCurrentUserContextValues = {
  currentUser: TUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<TUser>>;
};

export const CurrentUserContext = createContext(
  {} as TCurrentUserContextValues
);

export const CurrentUserProvider = ({
  children,
}: TCurrentUserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<TUser>({} as TUser);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
