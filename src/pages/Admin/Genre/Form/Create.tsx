import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react";
import { useGender } from "../hooks/useGender";
import { TitleWithBackButton } from "../../../../components/TitleWithBackButton";
import { useEffect } from "react";

export const CreateGender = () => {
  const {
    errors,
    handleSubmit,
    onSubmitHandler,
    register,
    isLoading,
    setValue,
    gender,
  } = useGender();

  useEffect(() => {
    if (gender.idGender) {
      setValue("name", gender.name);
    }
  }, [gender]);

  return (
    <Box p="15px">
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
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <FormControl mt="6">
                <Input {...register("name")} placeholder="Nome" />
                {errors.name && (
                  <Text color="red.500" fontSize={"sm"} pt="5px">
                    {errors.name?.message}
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
