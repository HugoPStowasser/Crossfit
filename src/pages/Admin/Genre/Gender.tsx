import { Box } from "@chakra-ui/react";
import { GenreTable } from "./Table";
import { HeaderWithTitle } from "../../../components/HeaderWithTitle";

export const Genre = () => {
  return (
    <Box>
      <HeaderWithTitle title="Gênero" createRoute="create" />
      <GenreTable />
    </Box>
  );
};