import { useState } from "react";
import { useQuery } from "react-query";
import { useUserRequest } from "./useUserRequest";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { TUserHttp } from "../types";
import { mapperHttpToTable } from "../mappers";
export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { errorToast } = useCustomToast();
  const apiUser = useUserRequest();

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const { data }: { data: TUserHttp[] } = await apiUser.getAll();
      return mapperHttpToTable(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar os usuários!`,
      });
    } finally {
      setIsLoading(false);
    }
    return [];
  };

  const { data: allUsers } = useQuery({
    queryKey: ["user"],
    queryFn: getAllUsers,
  });

  return {
    isLoading,
    allUsers,
  };
};
