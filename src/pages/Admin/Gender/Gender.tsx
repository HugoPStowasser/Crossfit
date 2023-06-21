import { Box } from "@chakra-ui/react";
import { GenderTable } from "./Table";
import { HeaderWithTitle } from "../../../components/HeaderWithTitle";

export const Gender = () => {
  return (
    <Box>
      <HeaderWithTitle title="Gênero" createRoute="create" />
      <GenderTable />
    </Box>
  );
};