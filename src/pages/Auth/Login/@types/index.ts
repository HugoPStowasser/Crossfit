import { z } from "zod";
import { loginUserFormSchema } from "../schemas/schema";
import { TProfile } from "../../../../@types/profile";

export type TLoginResponse = {
  user: {
    idUser: Number;
    email: string;
    name: string;
    socialName?: string;
    profile: TProfile;
  };
  token: string;
};
export type TLoginFormValues = z.infer<typeof loginUserFormSchema>;
