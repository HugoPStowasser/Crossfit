import { isAfter, parseISO } from "date-fns";
import { z } from "zod";

type TPaymentTypesIds = { paymentTypes: number[] };
export const paymentUpdateFormSchema = ({ paymentTypes }: TPaymentTypesIds) =>
  z.object({
    invoice: z.number().min(0, "Insira um valor válido."),
    datePayment: z
      .string()
      .refine((value) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(value);
      }, "Data de nascimento inválida")
      .refine((value) => {
        return isAfter(new Date(), parseISO(value));
      }, "Data de pagamento não pode ser maior que a de hoje."),
    paymentType: z
      .string()
      .refine((value) => paymentTypes.includes(Number(value)), {
        message: "Por favor, selecione a forma de pagamento.",
      }),
  });
