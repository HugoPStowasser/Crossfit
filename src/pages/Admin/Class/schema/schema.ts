import { isBefore, parseISO, subDays } from "date-fns";
import { z } from "zod";

const validateHours = (startHour: string, endHour: string) => {
  const horaInicial = startHour;
  const horaFinal = endHour;
  const horaInicialNumerica = parseInt(horaInicial.replace(":", ""), 10);
  const horaFinalNumerica = parseInt(horaFinal.replace(":", ""), 10);
  const isValid = horaFinalNumerica > horaInicialNumerica;
  return isValid;
};

type TProfessorsIds = { professors: number[] };
export const classFormSchema = ({ professors }: TProfessorsIds) =>
  z
    .object({
      name: z.string().nonempty("O nome da aula é obrigatório.").max(255),
      description: z
        .string()
        .nonempty("A descrição da aula é obrigatória.")
        .max(255),
      startHour: z.string(),
      endHour: z.string(),
      date: z
        .string()
        .refine((value) => {
          const regex = /^\d{4}-\d{2}-\d{2}$/;
          return regex.test(value);
        }, "Insira uma data válida.")
        .refine((value) => {
          return isBefore(subDays(new Date(), 1), parseISO(value));
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
