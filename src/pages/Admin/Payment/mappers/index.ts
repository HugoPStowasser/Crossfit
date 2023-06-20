import { format, formatISO, parseISO } from "date-fns";
import { TPaymentData, TPaymentHttp } from "../types";

export const mapperHttpToTable = (data: TPaymentHttp[]) => {
  return data.map((payment, index) => {
    let invoice;
    if (payment.invoice) {
      invoice = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(payment.invoice);
    }
    return {
      ...payment,
      index: index + 1,
      student: payment.student.user.socialName || payment.student.user.name,
      status: payment.status.name,
      invoice: invoice || "A inserir",
      dueDate: format(parseISO(payment.dueDate), "dd/MM/yyyy"),
    };
  });
};

export const mapperHttpToForm = (data: TPaymentHttp): TPaymentData => {
  const datePayment = formatISO(parseISO(new Date().toISOString()), {
    representation: "date",
  });
  return {
    idPayment: data.idPayment,
    datePayment: data.datePayment || datePayment,
    idPaymentType: data.idPaymentType || 0,
    invoice: data.invoice || 0,
    dueDate: data.dueDate,
    status: data.status.name,
    studentName: data.student.user.socialName || data.student.user.name,
  };
};
