import { z } from "zod";
export const genreFormSchema = z.object({
  description: z
    .string()
    .nonempty("O nome do gênero é obrigatório.")
    .max(255),
});
