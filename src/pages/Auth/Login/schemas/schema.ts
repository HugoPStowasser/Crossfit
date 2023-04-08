import { z } from "zod";

export const loginUserFormSchema = z.object({
  email: z
    .string()
    .nonempty("O E-mail é obrigatório.")
    .email("É preciso inserir um e-mail válido."),
  password: z.string().nonempty("A Senha é obrigratório."),
});
