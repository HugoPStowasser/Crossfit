import { Box } from "@chakra-ui/react";
import { TitleWithBackButton } from "../../../components/TitleWithBackButton";
import { PaymentTable } from "./Table";

export const Payment = () => {
  return (
    <Box my="20px" px="15px">
      <TitleWithBackButton title={`Lançar Pagamentos`} />
      <PaymentTable />
    </Box>
  );
};
