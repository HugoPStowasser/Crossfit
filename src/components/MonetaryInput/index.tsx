import { useEffect, useState, ChangeEvent, useRef } from "react";
import { UseFormWatch } from "react-hook-form";
import { insertNewValue, removeNumber } from "./utils";
import { FormControl, Input, InputProps, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type Omitted = "name" | "register";

export interface BasicFieldProps extends InputProps {
  required?: boolean;
  name: string;
  disabled?: boolean;
  err?: string;
  title?: string;
  fieldsetInline?: boolean;
}

interface IMonetaryInput<TFormValues> extends Omit<BasicFieldProps, Omitted> {
  minimumFractionDigits?: 0 | 1 | 2 | 3 | 4;
  maxInteger?: number;
  watch?: UseFormWatch<any>;
  valueProps?: string | number;
  name: keyof TFormValues;
  symbol?: "R$" | "%" | "";
  valueCanBeZero?: boolean;
  handleChange: (name: keyof TFormValues, nextValue: number) => void;
  errorMessage?: string;
}

const MonetaryInput = <TFormValues,>({
  minimumFractionDigits = 2,
  maxInteger = 19,
  symbol = "R$",
  name,
  valueProps,
  watch,
  handleChange,
  valueCanBeZero,
  errorMessage,
  ...rest
}: IMonetaryInput<TFormValues>) => {
  const refBackspace = useRef<boolean>(false);
  const watchFn = watch || ((name: keyof TFormValues) => name);
  const {
    formState: { errors },
  } = useFormContext();
  const [values, setValues] = useState({
    monetary: !!valueCanBeZero ? `${symbol} 0,00` : "",
    numeric: 0,
  });
  const value = watchFn(name) || values.numeric;

  const handleStateValues = (nextValue: number) => {
    const _values = { ...values };

    _values.numeric = nextValue;
    _values.monetary = nextValue.toLocaleString("pt-BR", {
      currency: "BRL",
      style: "currency",
      minimumFractionDigits,
    });

    if (symbol !== "R$") {
      _values.monetary = _values.monetary.replace("R$", symbol);
    }

    return _values;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    const monetaryStringValue = e.target.value;
    let _value;

    if (refBackspace.current) {
      refBackspace.current = false;
      _value = removeNumber(values.numeric);
    } else {
      _value = insertNewValue(
        monetaryStringValue,
        minimumFractionDigits,
        symbol
      );
    }

    const newValues = handleStateValues(parseFloat(_value));
    setValues(newValues);
    handleChange(name, newValues.numeric);
  };

  useEffect(() => {
    let _value = value;
    if (!!valueProps) {
      _value = valueProps;
    }
    const current = values.numeric;

    if (typeof _value === "string") {
      _value = parseFloat(value);
    }

    if (_value !== current) {
      const _values = handleStateValues(_value);
      setValues(_values);
    }
  }, [value, valueProps]);
  return (
    <FormControl mt="6">
      <Input
        name={name as string}
        // nameRegister={name}
        // @ts-ignore
        register={() => {}}
        onKeyDown={(event: any) => {
          if (event.code === "Backspace") {
            refBackspace.current = true;
          }
        }}
        onChange={handleInputChange}
        value={values.monetary}
        maxLength={maxInteger + minimumFractionDigits}
        {...rest}
      />
      {errors && (
        <Text color="red.500" fontSize={"sm"} pt="5px">
          {errorMessage}
        </Text>
      )}
    </FormControl>
  );
};

export default MonetaryInput;
