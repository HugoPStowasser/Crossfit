import { Box, Text } from "@chakra-ui/react";
import { TitleWithBackButton } from "../../../components/TitleWithBackButton";
import { usePayments } from "./hooks/usePayments";
import { Loading } from "../../../components/Loading";
import { TPaymentHttpToList } from "./types";

export const Payments = () => {
  const { loadingRef, allPayments } = usePayments();
  return (
    <Box p="10px" mt="15px">
      <Loading ref={loadingRef} />
      <TitleWithBackButton title="Pagamentos" />
      <Box display="flex" alignItems={"center"} justifyContent={"center"}>
        <Box
          w="100%"
          py="20px"
          maxH="100vh"
          overflow={"auto"}
          maxW={"720px"}
          display={"flex"}
          flexDir={"column"}
          gap={3}
        >
          {allPayments?.map((item: TPaymentHttpToList) => (
            <Box
              borderRadius={4}
              w="100%"
              backgroundColor={
                item.normalizedStatus === "PAYMENT_DONE"
                  ? "gray.300"
                  : "yellow.300"
              }
              padding={"15px"}
            >
              <Box display={"flex"} flexDir={"column"} gap={3}>
                <Text>
                  <span style={{ fontWeight: "bold" }}>
                    Data de Vencimento:
                  </span>{" "}
                  {item.dueDate}
                </Text>
                {item.datePayment && (
                  <Text>
                    <span style={{ fontWeight: "bold" }}>
                      Data de Pagamento:
                    </span>{" "}
                    {item.datePayment}
                  </Text>
                )}
              </Box>
              <Box
                mt="10px"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Text>
                  <span style={{ fontWeight: "bold" }}>Valor:</span>{" "}
                  {item.invoice || "Sob consulta"}
                </Text>
                <Text
                  fontSize={"12px"}
                  backgroundColor={
                    item.normalizedStatus === "PAYMENT_DONE"
                      ? "gray.500"
                      : "yellow.500"
                  }
                  color={
                    item.normalizedStatus === "PAYMENT_DONE"
                      ? "gray.100"
                      : "yellow.100"
                  }
                  p="5px 10px"
                  borderRadius={12}
                >
                  {item.status}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
