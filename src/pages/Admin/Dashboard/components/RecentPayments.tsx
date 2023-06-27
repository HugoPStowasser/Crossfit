import { Box, Button, Text } from "@chakra-ui/react";
import { useDashboard } from "../hooks/useDashboard";
import { Table } from "antd";
import { TbList } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "#",
    dataIndex: "index",
    key: "index",
    width: "5%",
  },
  {
    title: "Aluno",
    dataIndex: "student",
    key: "student",
  },
  {
    title: "Valor",
    dataIndex: "invoice",
    key: "invoice",
  },
];
export const RecentPayments = () => {
  const { paymentIsLoading, allPayments } = useDashboard();
  const navigate = useNavigate();

  return (
    <>
      <Box
        w="100%"
        display="flex"
        flexDir={"column"}
        justifyContent={"space-between"}
        h="86.5%"
      >
        <Text mb="24px" fontWeight={"semibold"}>
          Pagamentos Recentes
        </Text>
        <Table
          loading={paymentIsLoading}
          dataSource={allPayments}
          columns={columns}
          rowKey={(data) => data.idPayment}
        />
      </Box>
      <Button
        mt="16px"
        w="100%"
        leftIcon={<TbList size={18} />}
        onClick={() => navigate("/admin/payment")}
      >
        Lançar Pagamentos
      </Button>
    </>
  );
};
