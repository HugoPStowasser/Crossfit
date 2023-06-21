import { Table } from "antd";
import { useQuery } from "react-query";
import { useGender } from "../hooks/useGender";
import { Box } from "@chakra-ui/react";
import { ColumnsType } from "antd/lib/table";
import {
  ButtonAction,
  EActionButton,
} from "../../../../components/ButtonAction";

type TData = {
  [key: string]: any;
};

type TColumns = {
  deleteFn?: (id: number) => Promise<void>;
};
const columns = ({ deleteFn }: TColumns): ColumnsType<TData> => {
  return [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: "5%",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Data de criação",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Data de atualização",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      width: "15%",
      render: (rowData: { idGender: number }) => {
        return (
          <>
            <ButtonAction
              id={rowData.idGender}
              actionType={EActionButton.edit}
            />
            <ButtonAction
              id={rowData.idGender}
              actionType={EActionButton.delete}
              deleteFn={deleteFn}
            />
          </>
        );
      },
    },
  ];
};

export const GenderTable = () => {
  const { isLoading, deleteById, allGenders } = useGender();
  return (
    <Box m="20px" mt="100px">
      <Table
        loading={isLoading}
        dataSource={allGenders}
        columns={columns({ deleteFn: deleteById })}
        rowKey={(data) => data.idGender}
      />
    </Box>
  );
};
