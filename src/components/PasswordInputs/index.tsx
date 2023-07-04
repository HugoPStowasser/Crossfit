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
        inputName="password"
        placeholder="Senha"
        errorMessage={errors.password?.message}
        type="password"
      />
      <InputBase
        inputName="confirmPassword"
        placeholder="Confirmar Senha"
        errorMessage={errors.confirmPassword?.message}
        type="password"
      />
    </>
  );
};
