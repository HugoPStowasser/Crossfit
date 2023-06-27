export type TClassHttp = {
  idClass: number;
  name: string;
  date: string;
  startHour: string;
  endHour: string;
  description: string;
  professor: {
    idProfessor: number;
    user: {
      name: string;
      socialName: string;
    };
  };
  status: {
    idStatus: number;
    name: string;
  };
};

export type TClassData = {
  idClass: number;
  name: string;
  date: string;
  startHour: string;
  endHour: string;
  description: string;
  idProfessor: number;
  idStatus: number;
};

export type TClassFormValues = {
  name: string;
  date: string;
  startHour: string;
  endHour: string;
  description: string;
  professor: string;
};

export type TMapperHttpToTable = {
  index: number;
  professor: string;
  status: string;
  date: string;
  startHour: string;
  endHour: string;
  idClass: number;
  name: string;
  description: string;
};
