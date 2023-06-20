import { Box, Button } from "@chakra-ui/react";
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
                <MonetaryInput<TPaymentFormValues>
                  name="invoice"
                  placeholder={"Valor"}
                  err={errors.invoice?.message}
                  handleChange={setValue}
                  watch={formMethods.watch}
                  maxLength={17}
                />

                <InputBase
                  inputName="datePayment"
                  placeholder="Data de Pagamento"
                  type="date"
                  errorMessage={errors.datePayment?.message}
                />

                <SelectBase
                  onFocus={getAllPaymentTypes}
                  options={allPaymentTypes}
                  inputName="paymentType"
                  errorMessage={errors.paymentType?.message}
                />
                <InputBase
                  inputName="studentName"
                  placeholder="Estudante"
                  errorMessage={errors.studentName?.message}
                  isDisabled
                />
                <InputBase
                  inputName="dueDate"
                  placeholder="Data de Vencimento"
                  type="date"
                  isDisabled
                  errorMessage={errors.dueDate?.message}
                />
                <InputBase
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
