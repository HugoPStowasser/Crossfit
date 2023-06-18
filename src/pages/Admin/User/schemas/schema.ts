import { z } from "zod";
export const professorFormSchema = z.object({
  name: z.string().nonempty("O nome do professor é obrigatório.").max(255),
});

export const adminCreateFormSchema = z
  .object({
    name: z.string().nonempty("O nome é obrigatório.").max(255),
    email: z.string().email().nonempty("O email é obrigatório.").max(100),
    password: z.string().min(4, "A senha deve ter mais de 4 caracteres"),
    confirmPassword: z.string().min(4, "A senha deve ter mais de 4 caracteres"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "O campo senha e confirmar senha devem ser iguais.",
      });
    }
  });

export const adminUpdateFormSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório.").max(255),
  email: z.string().email().nonempty("O email é obrigatório.").max(100),
});
