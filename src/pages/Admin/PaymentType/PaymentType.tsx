import { Box } from "@chakra-ui/react";
import { PaymentTypeTable } from "./Table";
import { HeaderWithTitle } from "../../../components/HeaderWithTitle";

export const PaymentType = () => {
  return (
    <Box>
      <HeaderWithTitle title="Tipos de Pagamento" createRoute="create" />
      <PaymentTypeTable />
    </Box>
  );
};
