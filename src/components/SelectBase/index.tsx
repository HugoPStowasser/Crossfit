import { Select, SelectProps, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type TSelectBase = {
  inputName: string;
  options: {
    value: number;
    label: string;
    selected: boolean;
  }[];
  errorMessage?: string;
} & SelectProps;
export const SelectBase = ({
  inputName,
  options,
  errorMessage,
  ...props
}: TSelectBase) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Select {...register(inputName)} mt="1.5rem" {...props}>
        <option value="">Selecione</option>
        {options.map(({ value, label, selected }) => (
          <option key={value} value={value} selected={selected}>
            {label}
          </option>
        ))}
      </Select>
      {errors && (
        <Text color="red.500" fontSize={"sm"} pt="5px">
          {errorMessage}
        </Text>
      )}
    </>
  );
};
