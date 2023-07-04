import {
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { forwardRef, Ref, useImperativeHandle, useState, memo } from "react";
import loadingGif from "../../assets/loading-gif.gif";

export type TLoadingRef = {
  isLoading: boolean;
  onCloseLoading: () => void;
  onOpenLoading: () => void;
};

export const Loading = forwardRef(
  (
    { startLoading = false }: { startLoading?: boolean },
    ref: Ref<TLoadingRef>
  ) => {
    const [isLoading, setIsLoading] = useState<boolean>(startLoading);

    const onCloseLoading = () => setIsLoading(false);
    const onOpenLoading = () => setIsLoading(true);

    useImperativeHandle(ref, () => ({
      isLoading,
      onCloseLoading,
      onOpenLoading,
    }));

    return (
      <Modal isCentered isOpen={isLoading} onClose={() => {}}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(1px)" />
        <ModalContent
          pt="200px"
          bg="transparent"
          boxShadow={"none"}
          display="flex"
          width={"100%"}
          alignItems={"center"}
        >
          <Image src={loadingGif} width={"200px"} />
          <Text opacity={0.8} color="gray.600" fontWeight={"semibold"}>
            Carregando...
          </Text>
        </ModalContent>
      </Modal>
    );
  }
);
