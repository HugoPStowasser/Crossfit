import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react";
import { useExercise } from "./hooks/useExercise";
import { TitleWithBackButton } from "../../../components/TitleWithBackButton";

export const CreateExercise = () => {
  const { errors, handleSubmit, onSubmitHandler, register, isLoading } =
    useExercise();

  return (
    <Box p="15px">
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
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <FormControl mt="6">
                <Input {...register("description")} placeholder="Nome" />
                {errors.description && (
                  <Text color="red.500" fontSize={"sm"} pt="5px">
                    {errors.description?.message}
                  </Text>
                )}
              </FormControl>
              <Button
                color="#222"
                colorScheme="yellow"
                size="md"
                w="100%"
                mt="5"
                type="submit"
                isLoading={isLoading}
              >
                Cadastrar
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
