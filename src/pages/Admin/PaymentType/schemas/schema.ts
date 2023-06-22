import { z } from "zod";
export const paymentTypeFormSchema = z.object({
  name: z
    .string()
    .nonempty("O nome do tipo de pagamento é obrigatório.")
    .max(255),
});
