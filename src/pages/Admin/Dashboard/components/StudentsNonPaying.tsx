import { Box, Button, Switch, Text } from "@chakra-ui/react";
import { Table } from "antd";
import { useDashboard } from "../hooks/useDashboard";
import { ColumnsType } from "antd/es/table";
import { TbFileEuro } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Loading, TLoadingRef } from "../../../../components/Loading";

type TData = {
  [key: string]: any;
};

type TSwitchButton = {
  isBlocked: boolean;
  unblock: (idStudent: number) => Promise<boolean>;
  rowData: TData;
};
const SwitchButton = ({ isBlocked, unblock, rowData }: TSwitchButton) => {
  const loadingRef = useRef<TLoadingRef>(null);
  return (
    <>
      <Loading ref={loadingRef} />
      <Switch
        size="md"
        isChecked={isBlocked}
        disabled={!isBlocked}
        onChange={() => {
          if (isBlocked) {
            loadingRef.current?.onOpenLoading();
            unblock(rowData.idStudent).finally(() => {
              loadingRef.current?.onCloseLoading();
            });
          }
        }}
      />
    </>
  );
};

const columns = (
  unblock: (idStudent: number) => Promise<boolean>
): ColumnsType<TData> => {
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
      render: (isBlocked, rowData) => (
        <SwitchButton
          isBlocked={isBlocked}
          rowData={rowData}
          unblock={unblock}
        />
      ),
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
  const { allStudentsNonPaying, studentsNonPayingIsLoading, unblock } =
    useDashboard();
  return (
    <>
      <Box w="100%" display="flex" flexDir={"column"} h="86.5%">
        <Text mb="24px" fontWeight={"semibold"}>
          Usuários Inadimplementes
        </Text>
        <Table
          loading={studentsNonPayingIsLoading}
          dataSource={allStudentsNonPaying}
          columns={columns(unblock)}
          rowKey={(data) => data.idStudent}
        />
      </Box>
    </>
  );
};
