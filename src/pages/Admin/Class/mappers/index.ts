import { format, formatISO, parseISO } from "date-fns";
import { TClassData, TClassHttp, TMapperHttpToTable } from "../types";

export const mapperHttpToTable = (data: TClassHttp[]): TMapperHttpToTable[] => {
  return data.map((exercise, index) => {
    const startHourFormatted = format(
      new Date(`2000-01-01T${exercise.startHour}`),
      "H'h'mm"
    );
    const endHourFormatted = format(
      new Date(`2000-01-01T${exercise.endHour}`),
      "H'h'mm"
    );

    return {
      ...exercise,
      index: index + 1,
      professor:
        exercise.professor.user.socialName || exercise.professor.user.name,
      status: exercise.status.name,
      date: format(new Date(exercise.date), "dd/MM/yyyy"),
      startHour: startHourFormatted,
      endHour: endHourFormatted,
    };
  });
};
export const mapperHttpToForm = (data: TClassHttp): TClassData => {
  const dateClass = formatISO(parseISO(new Date(data.date).toISOString()), {
    representation: "date",
  });
  return {
    ...data,
    idProfessor: data.professor.idProfessor || 0,
    idStatus: data.status.idStatus,
    date: dateClass,
  };
};

export default { mapperHttpToForm, mapperHttpToTable };
