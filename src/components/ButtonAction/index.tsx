import { Button, ButtonProps } from "@chakra-ui/react";
import { TbEye, TbPencil, TbTrash } from "react-icons/tb";

export enum EActionButton {
  edit = "edit",
  delete = "delete",
  view = "view",
}

type TButtonAction = Omit<ButtonProps, "id"> & {
  id: number;
  actionType: EActionButton;
};

export const ButtonAction = ({ id, actionType, ...props }: TButtonAction) => {
  const handleGoToPage = () => {
    console.log(id);
  };
  const handleDelete = () => {
    console.log(id);
  };

  const handleView = () => {
    console.log(id);
  };

  if (actionType === EActionButton.edit) {
    return (
      <Button
        _hover={{ opacity: 0.7 }}
        transition={"all 0.3s ease"}
        variant="unstyled"
        onClick={handleGoToPage}
        {...props}
      >
        <TbPencil size={22} />
      </Button>
    );
  } else if (actionType === EActionButton.delete) {
    return (
      <Button
        _hover={{ opacity: 0.7 }}
        transition={"all 0.3s ease"}
        variant="unstyled"
        onClick={handleDelete}
        {...props}
      >
        <TbTrash size={22} />
      </Button>
    );
  } else {
    return (
      <Button
        _hover={{ opacity: 0.7 }}
        transition={"all 0.3s ease"}
        variant="unstyled"
        onClick={handleView}
        {...props}
      >
        <TbEye size={22} />
      </Button>
    );
  }
};
