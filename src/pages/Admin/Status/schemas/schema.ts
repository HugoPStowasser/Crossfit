import { z } from "zod";
export const statusFormSchema = z.object({
  name: z
    .string()
    .nonempty("O nome do status é obrigatório.")
    .max(255),
});
