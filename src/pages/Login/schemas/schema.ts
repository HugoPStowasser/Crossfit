import { z } from "zod";

export const loginUserFormSchema = z.object({
  email: z
    .string()
    .nonempty("O E-mail é obrigatório.")
    .email("É preciso inserir um e-mail válido."),
  password: z
    .string()
    .min(6, "Senha mínima de 6 caracteres.")
    .nonempty("A Senha é obrigratório."),
});
