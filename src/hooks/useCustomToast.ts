import { UseToastOptions, useMediaQuery, useToast } from "@chakra-ui/react";

export const useCustomToast = () => {
  const [isLargerThan720] = useMediaQuery("(min-width: 720px)");
  const toast = useToast();

  const toastAttributes = {
    title: `Não foi possível encontrar os serviços!`,
    isClosable: true,
    duration: 2000,
    position: isLargerThan720 ? "top" : "bottom",
  } as UseToastOptions;

  const successToast = (options?: UseToastOptions) => {
    toast({
      ...toastAttributes,
      status: "success",
      ...options,
    });
  };
  const errorToast = (options?: UseToastOptions) => {
    toast({
      ...toastAttributes,
      status: "error",
      ...options,
    });
  };

  const alertToast = (options?: UseToastOptions) => {
    toast({
      ...toastAttributes,
      status: "warning",
      ...options,
    });
  };

  return {
    successToast,
    errorToast,
    alertToast,
  };
};
