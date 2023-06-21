import { z } from "zod";
export const professorFormSchema = z.object({
  name: z.string().nonempty("O nome do professor é obrigatório.").max(255),
});

export const adminCreateFormSchema = z
  .object({
    name: z.string().nonempty("O nome é obrigatório.").max(255),
    email: z
      .string()
      .email("Digite um e-mail válido.")
      .nonempty("O email é obrigatório.")
      .max(100),
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
  email: z
    .string()
    .email("Digite um e-mail válido.")
    .nonempty("O email é obrigatório.")
    .max(100),
});

type TGenderIds = { genderIds: number[] };
export const studentCreateFormSchema = ({ genderIds }: TGenderIds) =>
  z
    .object({
      name: z.string().nonempty("O nome é obrigatório.").max(255),
      email: z
        .string()
        .email("Digite um e-mail válido.")
        .nonempty("O email é obrigatório.")
        .max(100),
      birthDate: z.string().refine((value) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(value);
      }, "Data de nascimento inválida"),
      password: z.string().min(4, "A senha deve ter mais de 4 caracteres"),
      confirmPassword: z
        .string()
        .min(4, "A senha deve ter mais de 4 caracteres"),
      gender: z.string().refine((value) => genderIds.includes(Number(value)), {
        message: "Por favor, selecione um gênero válido.",
      }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "O campo senha e confirmar senha devem ser iguais.",
        });
      }
    });

export const studentUpdateFormSchema = ({ genderIds }: TGenderIds) =>
  z.object({
    name: z.string().nonempty("O nome é obrigatório.").max(255),
    birthDate: z.string().refine((value) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(value);
    }, "Data de nascimento inválida"),
    gender: z.string().refine((value) => genderIds.includes(Number(value)), {
      message: "Por favor, selecione um gênero válido.",
    }),
    email: z
      .string()
      .email("Digite um e-mail válido.")
      .nonempty("O email é obrigatório.")
      .max(100),
  });
