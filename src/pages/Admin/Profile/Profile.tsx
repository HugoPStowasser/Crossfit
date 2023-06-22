import { Box } from "@chakra-ui/react";
import { ProfileTable } from "./Table";
import { HeaderWithTitle } from "../../../components/HeaderWithTitle";

export const Profile = () => { 
  return (
    <Box>
      <HeaderWithTitle title="Perfi" createRoute="create" />
      <ProfileTable /> 
    </Box>
  );
};
