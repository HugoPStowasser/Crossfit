import { useState } from "react";
import { Button, ButtonProps, Text } from "@chakra-ui/react";
import { TbEye, TbPencil, TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Modal as ModalAntd } from "antd";

export enum EActionButton {
  edit = "edit",
  delete = "delete",
}

type TButtonAction = Omit<ButtonProps, "id"> & {
  id: number;
  actionType: EActionButton;
  prefRoute?: string;
  deleteFn?: (id: number) => Promise<void>;
};

export const ButtonAction = ({
  id,
  actionType,
  deleteFn,
  prefRoute,
  ...props
}: TButtonAction) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEdit = () => {
    if (prefRoute) {
      navigate(`${prefRoute}/create/${id}`);
    } else {
      navigate(`create/${id}`);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    if (deleteFn) {
      await deleteFn(id);
    }
    setIsModalOpen(false);
    setIsLoading(false);
  };

  if (actionType === EActionButton.edit) {
    return (
      <Button
        _hover={{ opacity: 0.7 }}
        transition={"all 0.3s ease"}
        variant="unstyled"
        onClick={handleEdit}
        {...props}
      >
        <TbPencil size={22} />
      </Button>
    );
  } else {
    return (
      <>
        <Button
          _hover={{ opacity: 0.7 }}
          transition={"all 0.3s ease"}
          variant="unstyled"
          onClick={() => setIsModalOpen(true)}
          {...props}
        >
          <TbTrash size={22} />
        </Button>
        <ModalAntd
          closeIcon
          destroyOnClose
          title="Exclusão"
          open={isModalOpen}
          onOk={handleDelete}
          onCancel={() => setIsModalOpen(false)}
          okText="Confirmar"
          cancelText="Cancelar"
          confirmLoading={isLoading}
          okButtonProps={{
            style: { backgroundColor: "red" },
          }}
        >
          <Text>Você realmente deseja deletar este item?</Text>
        </ModalAntd>
      </>
    );
  }
};
