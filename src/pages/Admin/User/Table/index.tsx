import { Table } from "antd";
import { Box } from "@chakra-ui/react";
import { ColumnsType } from "antd/lib/table";
import {
  ButtonAction,
  EActionButton,
} from "../../../../components/ButtonAction";
import { useUser } from "../hooks/useUser";

type TData = {
  [key: string]: any;
};

type TColumns = {
  deleteFn?: (id: number) => Promise<void>;
};
const columns = ({
  deleteFn = async () => {},
}: TColumns): ColumnsType<TData> => {
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
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Perfil",
      dataIndex: "profile",
      key: "profile",
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      width: "15%",
      render: (rowData: { idUser: number; profile: string }) => {
        return (
          <>
            <ButtonAction
              id={rowData.idUser}
              actionType={EActionButton.edit}
              prefRoute={rowData.profile.toLowerCase()}
            />
            <ButtonAction
              id={rowData.idUser}
              actionType={EActionButton.delete}
              deleteFn={deleteFn}
            />
          </>
        );
      },
    },
  ];
};
export const UserTable = () => {
  const { isLoading, allUsers, deleteById } = useUser();

  return (
    <Box m="20px" mt="100px">
      <Table
        loading={isLoading}
        dataSource={allUsers}
        columns={columns({ deleteFn: deleteById })}
        rowKey={(data) => data.idUser}
      />
    </Box>
  );
};
