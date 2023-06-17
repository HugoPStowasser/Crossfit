import { z } from "zod";
export const professorFormSchema = z.object({
  name: z.string().nonempty("O nome do professor é obrigatório.").max(255),
});
