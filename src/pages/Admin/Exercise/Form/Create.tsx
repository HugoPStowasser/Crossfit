import { Box, Button } from "@chakra-ui/react";
import { useExercise } from "../hooks/useExercise";
import { TitleWithBackButton } from "../../../../components/TitleWithBackButton";
import { useEffect } from "react";
import { InputBase } from "../../../../components/InputBase";
import { FormProvider } from "react-hook-form";
import { Loading } from "../../../../components/Loading";

export const CreateExercise = () => {
  const { formMethods, onSubmit, isLoading, exercise, loadingRef } =
    useExercise();
  const {
    setValue,
    formState: { errors },
  } = formMethods;
  useEffect(() => {
    if (exercise.idExercise) {
      setValue("description", exercise.description);
    }
  }, [exercise]);

  return (
    <Box p="15px">
      <Loading ref={loadingRef} />
      <TitleWithBackButton title="Cadastrar Exercício" />
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
                  inputName="description"
                  placeholder="Nome do Exercício"
                  errorMessage={errors.description?.message}
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
                  {exercise.idExercise ? "Salvar" : "Cadastrar"}
                </Button>
              </form>
            </FormProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
