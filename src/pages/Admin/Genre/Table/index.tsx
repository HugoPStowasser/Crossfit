import { Table } from "antd";
import { useQuery } from "react-query";
import { useGenre } from "../hooks/useGender";
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
      render: (rowData: { idGenre: number }) => {
        return (
          <>
            <ButtonAction
              id={rowData.idGenre}
              actionType={EActionButton.edit}
            />
            <ButtonAction
              id={rowData.idGenre}
              actionType={EActionButton.delete}
              deleteFn={deleteFn}
            />
          </>
        );
      },
    },
  ];
};

export const GenreTable = () => {
  const { isLoading, deleteById, allGenres } = useGenre();
  return (
    <Box m="20px" mt="100px">
      <Table
        loading={isLoading}
        dataSource={allGenres}
        columns={columns({ deleteFn: deleteById })}
        rowKey={(data) => data.idGenre}
      />
    </Box>
  );
};
