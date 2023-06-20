import { useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { TitleWithBackButton } from "../../../../components/TitleWithBackButton";
import { useProfessor } from "../hooks/useProfessor";
import { InputBase } from "../../../../components/InputBase";
import { FormProvider } from "react-hook-form";
import { Loading } from "../../../../components/Loading";

export const CreateProfessor = () => {
  const { onSubmit, formMethods, isLoading, professor, loadingRef } =
    useProfessor();
  const {
    setValue,
    formState: { errors },
  } = formMethods;

  useEffect(() => {
    if (professor.idProfessor) {
      setValue("name", professor.name);
      setValue("socialName", professor.socialName);
    }
  }, [professor]);

  return (
    <Box p="15px">
      <Loading ref={loadingRef} />
      <TitleWithBackButton title="Cadastrar Professor" />
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
                <InputBase
                  inputName="name"
                  placeholder="Nome"
                  errorMessage={errors.name?.message}
                />
                <InputBase
                  inputName="socialName"
                  placeholder="Nome social"
                  errorMessage={errors.socialName?.message}
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
                  {professor.idProfessor ? "Salvar" : "Cadastrar"}
                </Button>
              </form>
            </FormProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
