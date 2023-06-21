import { isAfter, isBefore, parse, parseISO } from "date-fns";
import { z } from "zod";

const validateHours = (startHour: string, endHour: string) => {
  const startTime = parse(startHour, "HH:mm", new Date());
  const endTime = parse(endHour, "HH:mm", new Date());

  return isAfter(startTime, endTime);
};

type TProfessorsIds = { professors: number[] };
export const classUpdateFormSchema = ({ professors }: TProfessorsIds) =>
  z
    .object({
      name: z.string().nonempty("O nome da aula é obrigatório.").max(255),
      description: z
        .string()
        .nonempty("A descrição da aula é obrigatória.")
        .max(255),
      startHour: z.string({ description: "Insiria uma hora válida." }).refine(
        (value) => {
          const regex = /^\d{2}:\d{2}$/;
          return regex.test(value);
        },
        {
          message: "Insira uma hora inicial válida.",
          path: ["startHour"],
        }
      ),
      endHour: z.string().refine(
        (value) => {
          // Adicione aqui a lógica de validação para a hora final
          const regex = /^\d{2}:\d{2}$/;
          return regex.test(value);
        },
        {
          message: "A hora final deve ser maior que a hora inicial.",
          path: ["endHour"],
        }
      ),
      date: z
        .string()
        .refine((value) => {
          const regex = /^\d{4}-\d{2}-\d{2}$/;
          return regex.test(value);
        }, "Insira uma data válida.")
        .refine((value) => {
          return isBefore(new Date(), parseISO(value));
        }, "A data da aula não pode ser anterior a data de hoje."),
      professor: z
        .string()
        .refine((value) => professors.includes(Number(value)), {
          message: "Por favor, selecione o professor que dará a aula.",
        }),
    })
    .refine((data) => validateHours(data.startHour, data.endHour), {
      message: "A hora final não pode ser maior que a hora inicial.",
      path: ["endHour"], // path of error
    });
