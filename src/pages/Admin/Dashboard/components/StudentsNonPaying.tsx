import { Box, Button, Text } from "@chakra-ui/react";
import { Table } from "antd";
import { useDashboard } from "../hooks/useDashboard";
import { ColumnsType } from "antd/es/table";
import { TbFileEuro } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

type TData = {
  [key: string]: any;
};

const columns = (): ColumnsType<TData> => {
  const navigate = useNavigate();
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
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Data de vencimento",
      dataIndex: "dueDate",
      key: "dueDate",
      sorter: true,
    },
    {
      title: "Bloqueado",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked) => (isBlocked ? "Sim" : "Não"),
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      width: "5%",
      render: (rowData: { idPayment: number }) => {
        return (
          <>
            <Button
              _hover={{ opacity: 0.7 }}
              transition={"all 0.3s ease"}
              variant="unstyled"
              onClick={() =>
                navigate(`/admin/payment/create/${rowData.idPayment}`)
              }
            >
              <TbFileEuro size={22} />
            </Button>
          </>
        );
      },
    },
  ];
};

export const StudentNonPaying = () => {
  const { allStudentsNonPaying, studentsNonPayingIsLoading } = useDashboard();
  return (
    <>
      <Box w="100%" display="flex" flexDir={"column"} h="86.5%">
        <Text mb="24px" fontWeight={"semibold"}>
          Usuários Inadimplementes
        </Text>
        <Table
          loading={studentsNonPayingIsLoading}
          dataSource={allStudentsNonPaying}
          columns={columns()}
          rowKey={(data) => data.idStudent}
        />
      </Box>
    </>
  );
};
