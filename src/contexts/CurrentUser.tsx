import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { TUserHttp } from "../@types/user";
import { isAdminHandler } from "../functions";
import { UserApiToHttp } from "../mappers/user";

type TCurrentUserProviderProps = {
  children: ReactNode;
};

type TCurrentUserContextValues = {
  currentUser: TUserHttp;
  setCurrentUser: (T: TUserHttp) => void;
  isAdmin: boolean;
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

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("@User") || "{}");
    setStateCurrentUser(UserApiToHttp(userInfo));
  }, []);

  const setCurrentUser = (user: TUserHttp) => setStateCurrentUser(user);

  const isAdmin = useMemo(() => {
    return isAdminHandler(currentUser?.profile?.normalizedName || "");
  }, [currentUser]);
  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isAdmin }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
