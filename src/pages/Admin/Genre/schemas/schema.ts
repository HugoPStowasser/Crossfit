import { z } from "zod";
export const genderFormSchema = z.object({
  description: z
    .string()
    .nonempty("O nome do gênero é obrigatório.")
    .max(255),
});
