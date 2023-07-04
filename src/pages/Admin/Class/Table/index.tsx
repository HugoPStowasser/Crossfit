import { Table } from "antd";
import { useClass } from "../hooks/useClass";
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
      title: "Data da aula",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Hora de início",
      dataIndex: "startHour",
      key: "startHour",
      width: "8%",
    },
    {
      title: "Hora de fim",
      dataIndex: "endHour",
      key: "endHour",
      width: "8%",
    },
    {
      title: "Professor",
      dataIndex: "professor",
      key: "professor",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      width: "15%",
      render: (rowData: { idClass: number }) => {
        return (
          <>
            <ButtonAction
              id={rowData.idClass}
              actionType={EActionButton.edit}
            />
            <ButtonAction
              id={rowData.idClass}
              actionType={EActionButton.delete}
              deleteFn={deleteFn}
            />
          </>
        );
      },
    },
  ];
};
export const ClassTable = () => {
  const { isLoading, deleteById, allClasses } = useClass();
  return (
    <Box m="20px" mt="100px">
      <Table
        loading={isLoading}
        dataSource={allClasses}
        columns={columns({ deleteFn: deleteById })}
        rowKey={(data) => data.idClass}
      />
    </Box>
  );
};
