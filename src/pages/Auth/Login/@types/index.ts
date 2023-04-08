import { z } from "zod";
import { loginUserFormSchema } from "../schemas/schema";

export type TLoginFormValues = z.infer<typeof loginUserFormSchema>;
