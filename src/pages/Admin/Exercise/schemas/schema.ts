import { z } from "zod";
export const exerciseFormSchema = z.object({
  description: z
    .string()
    .nonempty("O nome do exercício é obrigatório.")
    .max(255),
});
