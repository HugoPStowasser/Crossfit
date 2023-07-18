import { Table } from "antd";
import { usePayment } from "../hooks/usePayment";
import { Box } from "@chakra-ui/react";
import { ColumnsType } from "antd/lib/table";
import {
  ButtonAction,
  EActionButton,
} from "../../../../components/ButtonAction";

type TData = {
  [key: string]: any;
};

const columns = (): ColumnsType<TData> => {
  return [
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
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Valor",
      dataIndex: "invoice",
      key: "invoice",
    },
    {
      title: "Data de vencimento",
      dataIndex: "dueDate",
      key: "dueDate",
      sorter: true,
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      width: "15%",
      render: (rowData: { idPayment: number }) => {
        return (
          <>
            <ButtonAction
              id={rowData.idPayment}
              actionType={EActionButton.edit}
            />
          </>
        );
      },
    },
  ];
};
export const PaymentTable = () => {
  const { isLoading, allPayments } = usePayment();
  return (
    <Box m="20px" mt="100px">
      <Table
        loading={isLoading}
        dataSource={allPayments}
        columns={columns()}
        rowKey={(data) => data.idPayment}
      />
    </Box>
  );
};
