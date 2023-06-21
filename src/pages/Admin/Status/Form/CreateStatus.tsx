import { Box, Button } from "@chakra-ui/react";
import { useStatus } from "../hooks/useStatus";
import { TitleWithBackButton } from "../../../../components/TitleWithBackButton";
import { useEffect } from "react";
import { InputBase } from "../../../../components/InputBase";
import { FormProvider } from "react-hook-form";
import { Loading } from "../../../../components/Loading";

export const CreateStatus = () => {
  const { formMethods, onSubmit, isLoading, status, loadingRef } = useStatus();
  const {
    setValue,
    formState: { errors },
  } = formMethods;
  useEffect(() => {
    if (status.idStatus) {
      setValue("name", status.name);
    }
  }, [status]);

  return (
    <Box p="15px">
      <Loading ref={loadingRef} />
      <TitleWithBackButton title="Cadastrar Status" />
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
                  placeholder="Nome do Status"
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
                  {status.idStatus ? "Salvar" : "Cadastrar"}
                </Button>
              </form>
            </FormProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
