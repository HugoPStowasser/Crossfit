import { Box } from "@chakra-ui/react";
import { StatusTable } from "./Table";
import { HeaderWithTitle } from "../../../components/HeaderWithTitle";

export const Status = () => {
  return (
    <Box>
      <HeaderWithTitle title="Gênero" createRoute="create" />
      <StatusTable />
    </Box>
  );
};