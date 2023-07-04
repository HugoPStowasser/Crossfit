type TStatus = {
  idStatus: number;
  name: string;
  normalizedName: string;
};

type TPaymentType = {
  idPaymentType: number;
  name: string;
};

type TStudent = {
  user: {
    name: string;
    socialName: string;
  };
};
export type TPaymentHttp = {
  idPayment: number;
  idAdmin: number;
  student: TStudent;
  status: TStatus;
  idPaymentType: number | null;
  paymentType: TPaymentType | null;
  dueDate: string;
  invoice: number | null;
  datePayment: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type TPaymentData = {
  idPayment: number;
  idPaymentType: number;
  invoice: number;
  datePayment: string;
  dueDate: string;
  status: string;
  studentName: string;
  paymentType: {
    name: string;
  };
};

export type TPaymentFormValues = {
  invoice: number;
  datePayment: string;
  studentName: string;
  dueDate: string;
  status: string;
  paymentType: string;
};

export type TPaymentToHttp = {
  idPayment: number;
  idAdmin: number;
  idPaymentType: number;
  invoice: number;
  datePayment: string;
};
