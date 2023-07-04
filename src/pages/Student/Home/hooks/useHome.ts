import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useClassRequest } from "../../../Admin/Class/hooks/useClassRequest";
import { TClassHttp } from "../../../Admin/Class/types";
import classMappers from "../../../Admin/Class/mappers";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { useUserRequest } from "../../../Admin/User/hooks/useUserRequest";

export const useHome = () => {
  const apiClass = useClassRequest();
  const { errorToast } = useCustomToast();
  const { currentUser } = useCurrentUser();
  const apiUser = useUserRequest();

  const getAllClasses = async () => {
    const idUser =
      currentUser.idUser ||
      JSON.parse(localStorage.getItem("@User") || "{}").idUser;
    if (idUser) {
      try {
        const { data: studentData }: { data: { idStudent: number } } =
          await apiUser.getStudentByUserId(idUser);
        const { data }: { data: TClassHttp[] } = await apiClass.getAll(
          studentData.idStudent
        );
        const today = dayjs().startOf("day");
        const now = dayjs().startOf("hour");
        const classes = data
          ?.filter(
            (item) =>
              (dayjs(item.date).isSame(today, "day") &&
                dayjs(item.startHour, "HH:mm:ss").isAfter(now)) ||
              dayjs(item.date).isAfter(today)
          )
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        const classesToday = classes.filter((item) =>
          dayjs(item.date).isSame(today, "day")
        );
        const classesAfterToday = classes.filter(
          (item) => !dayjs(item.date).isSame(today, "day")
        );
        return {
          classesToday: classMappers.mapperHttpToTable(classesToday),
          classesAfterToday: classMappers.mapperHttpToTable(classesAfterToday),
        };
      } catch (error) {
        errorToast({
          title: `Não foi possível encontrar as aulas!`,
        });
      }
    }
    return {
      classesToday: [],
      classesAfterToday: [],
    };
  };

  const { data: allClasses, isLoading: classesIsLoading } = useQuery({
    queryKey: ["classes_home"],
    queryFn: getAllClasses,
  });

  return { allClasses, classesIsLoading };
};
