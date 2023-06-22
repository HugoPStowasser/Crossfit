import { z } from "zod";
export const profileFormSchema = z.object({
  name: z
    .string()
    .nonempty("O nome do perfil é obrigatório.")
    .max(255),
});
