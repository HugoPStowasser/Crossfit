import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react";
import { TitleWithBackButton } from "../../../../components/TitleWithBackButton";
import { useProfessor } from "../hooks/useProfessor";

export const CreateProfessor = () => {
  const { onSubmit, register, errors, isLoading } = useProfessor();
  return (
    <Box p="15px">
      <TitleWithBackButton title="Cadastrar Professor" />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        pt="100px"
      >
        <Box width={"80%"} maxW={"720px"}>
          <Box mt="100px">
            <form onSubmit={onSubmit}>
              <FormControl mt="6">
                <Input {...register("name")} placeholder="Nome" />
                {errors.name && (
                  <Text color="red.500" fontSize={"sm"} pt="5px">
                    {errors.name?.message}
                  </Text>
                )}
              </FormControl>
              <FormControl mt="6">
                <Input {...register("socialName")} placeholder="Nome Social" />
                {errors.socialName && (
                  <Text color="red.500" fontSize={"sm"} pt="5px">
                    {errors.socialName?.message}
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
