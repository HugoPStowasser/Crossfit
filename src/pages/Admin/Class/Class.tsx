import { Box } from "@chakra-ui/react";
import { ClassTable } from "./Table";
import { HeaderWithTitle } from "../../../components/HeaderWithTitle";

export const Class = () => {
  return (
    <Box>
      <HeaderWithTitle title="Aulas" createRoute="create" />
      <ClassTable />
    </Box>
  );
};
