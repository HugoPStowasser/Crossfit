import { FieldErrors } from "react-hook-form";
import { InputBase } from "../InputBase";

interface TFormTypes {
  password: string;
  confirmPassword: string;
}

export const PasswordInputs = ({
  errors,
}: {
  errors: FieldErrors<TFormTypes>;
}) => {
  return (
    <>
      <InputBase
        label="Senha:"
        inputName="password"
        placeholder="******"
        errorMessage={errors.password?.message}
        type="password"
      />
      <InputBase
        label="Confirmar Senha:"
        inputName="confirmPassword"
        placeholder="******"
        errorMessage={errors.confirmPassword?.message}
        type="password"
      />
    </>
  );
};
