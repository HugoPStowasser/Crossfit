export type TStudentNonPaying = {
  idStudent: number;
  idPayment: number;
  email: string;
  student: string;
  isBlocked: boolean;
  status: string;
  dueDate: string;
};
export type TStudentNonPayingHttp = {
  idStudent: number;
  idPayment: number;
  email: string;
  name: string;
  socialName: string;
  status: {
    name: string;
  };
  blockDescription: string;
  isBlocked: boolean;
  dueDate: string;
};
