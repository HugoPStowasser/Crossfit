import { format, formatISO, parseISO } from "date-fns";
import { TClassData, TClassHttp, TMapperHttpToTable } from "../types";

export const mapperHttpToTable = (data: TClassHttp[]): TMapperHttpToTable[] => {
  return data.map((classData, index) => {
    const startHourFormatted = format(
      new Date(`2000-01-01T${classData.startHour}`),
      "H'h'mm"
    );
    const endHourFormatted = format(
      new Date(`2000-01-01T${classData.endHour}`),
      "H'h'mm"
    );

    return {
      ...classData,
      index: index + 1,
      professor:
        classData.professor.user.socialName || classData.professor.user.name,
      status: classData.status.name,
      date: format(new Date(classData.date), "dd/MM/yyyy"),
      startHour: startHourFormatted,
      endHour: endHourFormatted,
      confirmedStudentLength: classData.confirmedStudents?.length,
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
