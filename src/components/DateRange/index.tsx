import { DatePicker, TimeRangePickerProps } from "antd";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { FormControl, Text } from "@chakra-ui/react";
import { parseISO } from "date-fns";

const { RangePicker } = DatePicker;

const RangePickerStyled = styled(RangePicker)`
  input {
    outline: none !important;
    font-size: 12px;
  }
  .ant-picker-active-bar {
    background: white;
  }
  .anticon-swap-right {
    display: none;
  }
  .ant-picker-panels {
    background: blue;
  }
`;

interface IDateRange extends TimeRangePickerProps {
  placeholder: [string, string];
  names: [string, string];
  label: string;
  required?: boolean;
  errorMessage?: string;
}

export const DateRange = ({
  placeholder,
  label,
  names,
  errorMessage,
  ...rest
}: IDateRange) => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const initialDateValue = useWatch({ control, name: names[0] });
  const endDateValue = useWatch({ control, name: names[1] });
  return (
    <FormControl mt="6">
      <RangePickerStyled
        style={{
          width: "100%",
          border: "none",
          boxShadow: "none",
        }}
        placeholder={placeholder}
        placement={"bottomRight"}
        format="DD/MM/yyyy"
        value={[
          initialDateValue && parseISO(initialDateValue),
          endDateValue && parseISO(endDateValue),
        ]}
        onChange={(date: any) => {
          setValue(names[0], date?.[0]?.toISOString());
          setValue(names[1], date?.[1]?.toISOString());
        }}
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
