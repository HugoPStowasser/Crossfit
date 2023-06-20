export type TClassHttp = {
  idClass: number;
  name: string;
  date: string;
  startHour: string;
  endHour: string;
  description: string;
  professor: {
    user: {
      name: string;
      socialName: string;
    };
  };
  status: {
    name: string;
  };
};
