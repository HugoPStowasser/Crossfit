import { FormControl, Input, InputProps, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type TInputBase = {
  label?: string;
  inputName: string;
  errorMessage?: string;
} & InputProps;

export const InputBase = ({
  label,
  inputName,
  errorMessage,
  ...props
}: TInputBase) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <FormControl mt="6">
      {label && (
        <Text color="gray.500" fontSize="sm" fontWeight={500}>
          {label}
        </Text>
      )}
      <Input {...register(inputName)} {...props} />
      {errors && (
        <Text color="red.500" fontSize={"sm"} pt="5px">
          {errorMessage}
        </Text>
      )}
    </FormControl>
  );
};
