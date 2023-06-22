import { Box, Button } from "@chakra-ui/react";
import { usePaymentType } from "../hooks/usePaymentType";
import { TitleWithBackButton } from "../../../../components/TitleWithBackButton";
import { useEffect } from "react";
import { InputBase } from "../../../../components/InputBase";
import { FormProvider } from "react-hook-form";
import { Loading } from "../../../../components/Loading";

export const CreatePaymentType = () => {
  const { formMethods, onSubmit, isLoading, paymentType, loadingRef } = usePaymentType();
  const {
    setValue,
    formState: { errors },
  } = formMethods;
  useEffect(() => {
    if (paymentType.idPaymentType) {
      setValue("name", paymentType.name);
    }
  }, [paymentType]);

  return (
    <Box p="15px">
      <Loading ref={loadingRef} />
      <TitleWithBackButton title="Cadastrar tipo de pagamento" />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        pt="100px"
      >
        <Box width={"80%"} maxW={"720px"}>
          <Box mt="100px">
            <FormProvider {...formMethods}>
              <form onSubmit={onSubmit}>
                <InputBase
                  inputName="name"
                  placeholder="Nome do tipo de pagamento"
                  errorMessage={errors.name?.message}
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
                  {paymentType.idPaymentType ? "Salvar" : "Cadastrar"}
                </Button>
              </form>
            </FormProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};