import { z } from "zod";

type TExerciseIds = { exercises: number[] };
export const registerPointsFormSchema = ({ exercises }: TExerciseIds) =>
  z.object({
    points: z.number().min(0, "Insira um valor válido."),
    exercise: z.string().refine((value) => exercises.includes(Number(value)), {
      message: "Por favor, selecione um exercício.",
    }),
  });
