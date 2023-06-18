import { z } from "zod";
export const adminFormSchema = z.object({
  description: z
    .string()
    .nonempty("O nome do administrador é obrigatório.")
    .max(255),
});
