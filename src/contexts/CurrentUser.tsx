import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { TUserHttp } from "../@types/user";
import { isAdminHandler } from "../functions";
import { UserApiToHttp } from "../mappers/user";
import { useUserRequest } from "../pages/Admin/User/hooks/useUserRequest";
import { EProfile } from "../@types/profile";

type TCurrentUserProviderProps = {
  children: ReactNode;
};

type TBlock = {
  isBlocked: boolean;
  blockDescription: string;
};

type TCurrentUserContextValues = {
  currentUser: TUserHttp;
  setCurrentUser: (T: TUserHttp) => void;
  setBlock: (T: TBlock) => void;
  isAdmin: boolean;
  block: TBlock;
};

export const CurrentUserContext = createContext(
  {} as TCurrentUserContextValues
);

export const CurrentUserProvider = ({
  children,
}: TCurrentUserProviderProps) => {
  const apiUser = useUserRequest();
  const [refetchUser, setRefetchUser] = useState(false);
  const [block, setBlock] = useState({} as TBlock);
  const [currentUser, setStateCurrentUser] = useState<TUserHttp>(
    {} as TUserHttp
  );

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("@User") || "{}");
    if (
      userInfo?.idUser &&
      userInfo.profile.normalizedName == EProfile.student
    ) {
      apiUser
        .getStudentByUserId(userInfo?.idUser)
        .then(({ data }: { data: TBlock }) => {
          setBlock({
            blockDescription: data.blockDescription,
            isBlocked: data.isBlocked,
          });
        });
    }
    setStateCurrentUser(UserApiToHttp(userInfo));
  }, [refetchUser]);

  const setCurrentUser = (user: TUserHttp) => setStateCurrentUser(user);

  const isAdmin = useMemo(() => {
    return isAdminHandler(currentUser?.profile?.normalizedName || "");
  }, [currentUser]);
  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isAdmin, block, setBlock }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
