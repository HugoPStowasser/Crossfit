import { Table } from "antd";
import { useQuery } from "react-query";
import { useExercise } from "../hooks/useExercise";
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
      dataIndex: "description",
      key: "description",
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
      render: (rowData: { idExercise: number }) => {
        return (
          <>
            <ButtonAction
              id={rowData.idExercise}
              actionType={EActionButton.edit}
            />
            <ButtonAction
              id={rowData.idExercise}
              actionType={EActionButton.delete}
              deleteFn={deleteFn}
            />
          </>
        );
      },
    },
  ];
};
export const ExerciseTable = () => {
  const { getAllExercises, deleteById } = useExercise();
  const { data, isLoading } = useQuery({
    queryKey: ["exercise"],
    queryFn: getAllExercises,
  });

  return (
    <Box m="20px" mt="100px">
      <Table
        loading={isLoading}
        dataSource={data}
        columns={columns({ deleteFn: deleteById })}
        rowKey={(data) => data.idExercise}
      />
    </Box>
  );
};
