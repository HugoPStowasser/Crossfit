import { Box, Button, Text } from "@chakra-ui/react";
import { TitleWithBackButton } from "../../../../components/TitleWithBackButton";
import { usePayment } from "../hooks/usePayment";
import { FormProvider } from "react-hook-form";
import { InputBase } from "../../../../components/InputBase";
import { Loading } from "../../../../components/Loading";
import { formatISO, parseISO } from "date-fns";
import { SelectBase } from "../../../../components/SelectBase";
import { useEffect } from "react";
import MonetaryInput from "../../../../components/MonetaryInput";
import { TPaymentFormValues } from "../types";

export const CreatePayment = () => {
  const {
    onSubmit,
    isLoading,
    payment,
    formMethods,
    loadingRef,
    getAllPaymentTypes,
    allPaymentTypes,
  } = usePayment();

  const {
    setValue,
    formState: { errors },
  } = formMethods;

  useEffect(() => {
    if (payment.idPayment) {
      setValue("studentName", payment.studentName);
      setValue("invoice", payment.invoice);
      setValue("status", payment.status);
      if (payment.datePayment) {
        const formattedDatePayment = formatISO(parseISO(payment.datePayment), {
          representation: "date",
        });
        setValue("datePayment", formattedDatePayment);
      }

      const formattedDueDate = formatISO(parseISO(payment.dueDate), {
        representation: "date",
      });
      setValue("dueDate", formattedDueDate);
      setValue("paymentType", String(payment.idPaymentType));
    }
  }, [payment]);

  return (
    <Box p="15px">
      <Loading ref={loadingRef} />
      <TitleWithBackButton title="Lançar Pagamento" />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
      >
        <Box width={"80%"} maxW={"720px"}>
          <Box mt="100px">
            <FormProvider {...formMethods}>
              <form onSubmit={onSubmit}>
                <InputBase inputName="invoice" display={"none"} />
                <Text
                  color="gray.500"
                  fontSize="sm"
                  mb="-20px"
                  fontWeight={500}
                >
                  Valor:
                </Text>
                <MonetaryInput<TPaymentFormValues>
                  valueCanBeZero
                  name="invoice"
                  placeholder={"Valor"}
                  err={errors.invoice?.message}
                  handleChange={setValue}
                  watch={formMethods.watch}
                  maxLength={17}
                />

                <InputBase
                  label="Data de Pagamento:"
                  inputName="datePayment"
                  placeholder="Data de Pagamento"
                  type="date"
                  errorMessage={errors.datePayment?.message}
                />
                <Text
                  mt="20px"
                  color="gray.500"
                  fontSize="sm"
                  mb="-20px"
                  fontWeight={500}
                >
                  Forma de Pagamento:
                </Text>
                <SelectBase
                  onFocus={getAllPaymentTypes}
                  options={allPaymentTypes}
                  inputName="paymentType"
                  errorMessage={errors.paymentType?.message}
                />
                <InputBase
                  label="Estudante:"
                  inputName="studentName"
                  placeholder="Estudante"
                  errorMessage={errors.studentName?.message}
                  isDisabled
                />
                <InputBase
                  label="Data de Vencimento:"
                  inputName="dueDate"
                  placeholder="Data de Vencimento"
                  type="date"
                  isDisabled
                  errorMessage={errors.dueDate?.message}
                />
                <InputBase
                  label="Status"
                  inputName="status"
                  placeholder="Status"
                  errorMessage={errors.status?.message}
                  isDisabled
                />
                <Button
                  color="#222"
                  colorScheme="yellow"
                  size="md"
                  w="100%"
                  mt="5"
                  type="submit"
                  isLoading={isLoading}
                >
                  {payment.idPayment ? "Salvar" : "Cadastrar"}
                </Button>
              </form>
            </FormProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
