import { Box, Button } from "@chakra-ui/react";
import { useGender } from "../hooks/useGender";
import { TitleWithBackButton } from "../../../../components/TitleWithBackButton";
import { useEffect } from "react";
import { InputBase } from "../../../../components/InputBase";
import { FormProvider } from "react-hook-form";
import { Loading } from "../../../../components/Loading";

export const CreateGender = () => {
  const { formMethods, onSubmit, isLoading, gender, loadingRef } = useGender();
  const {
    setValue,
    formState: { errors },
  } = formMethods;
  useEffect(() => {
    if (gender.idGender) {
      setValue("name", gender.name);
    }
  }, [gender]);

  return (
    <Box p="15px">
      <Loading ref={loadingRef} />
      <TitleWithBackButton title="Cadastrar Gênero" />
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
                  placeholder="Nome do Gênero"
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
                  {gender.idGender ? "Salvar" : "Cadastrar"}
                </Button>
              </form>
            </FormProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
