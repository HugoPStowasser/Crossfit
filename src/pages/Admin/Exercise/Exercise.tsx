import { Box } from "@chakra-ui/react";
import { ExerciseTable } from "./Table";
import { HeaderWithTitle } from "../../../components/HeaderWithTitle";

export const Exercise = () => {
  return (
    <Box>
      <HeaderWithTitle title="Exercício" createRoute="create" />
      <ExerciseTable />
    </Box>
  );
};
