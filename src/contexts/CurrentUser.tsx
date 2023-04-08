import { createContext, ReactNode, useState } from "react";
import { TUserHttp } from "../@types/user";

type TCurrentUserProviderProps = {
  children: ReactNode;
};

type TCurrentUserContextValues = {
  currentUser: TUserHttp;
  setCurrentUser: (T: TUserHttp) => void;
};

export const CurrentUserContext = createContext(
  {} as TCurrentUserContextValues
);

export const CurrentUserProvider = ({
  children,
}: TCurrentUserProviderProps) => {
  const [currentUser, setStateCurrentUser] = useState<TUserHttp>(
    {} as TUserHttp
  );

  const setCurrentUser = (user: TUserHttp) => setStateCurrentUser(user);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
