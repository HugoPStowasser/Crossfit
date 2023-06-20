import { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { TitleWithBackButton } from "../../../../components/TitleWithBackButton";
import { useAdmin } from "../hooks/useAdmin";
import { FieldErrors, FormProvider, useFormContext } from "react-hook-form";
import { TAdminFormValues } from "../types";
import { TbLockOpen, TbX } from "react-icons/tb";
import { InputBase } from "../../../../components/InputBase";
import { Loading } from "../../../../components/Loading";

const PasswordInputs = ({
  errors,
}: {
  errors: FieldErrors<TAdminFormValues>;
}) => {
  return (
    <>
      <InputBase
        inputName="password"
        placeholder="Senha"
        errorMessage={errors.password?.message}
        type="password"
      />
      <InputBase
        inputName="confirmPassword"
        placeholder="Confirmar Senha"
        errorMessage={errors.confirmPassword?.message}
        type="password"
      />
    </>
  );
};

export const CreateAdmin = () => {
  const [changePassword, setChangePassword] = useState(false);
  const { onSubmit, isLoading, admin, formMethods, loadingRef } = useAdmin();

  const {
    setValue,
    formState: { errors },
  } = formMethods;

  useEffect(() => {
    if (admin.idAdmin) {
      setValue("name", admin.name);
      setValue("socialName", admin.socialName);
      setValue("email", admin.email);
    }
  }, [admin]);

  useEffect(() => {
    if (!changePassword) {
      setValue("password", "");
      setValue("confirmPassword", "");
    }
  }, [changePassword]);

  return (
    <Box p="15px">
      <Loading ref={loadingRef} />
      <TitleWithBackButton title="Cadastrar Admin" />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
      >
        <Box width={"80%"} maxW={"720px"}>
          <Box mt="100px">
            <FormProvider {...formMethods}>
              <form onSubmit={onSubmit}>
                <InputBase
                  inputName="name"
                  placeholder="Nome"
                  errorMessage={errors.name?.message}
                />
                <InputBase
                  inputName="socialName"
                  placeholder="Nome social"
                  errorMessage={errors.socialName?.message}
                />
                <InputBase
                  inputName="email"
                  placeholder="E-mail"
                  errorMessage={errors.email?.message}
                />
                {admin.idAdmin ? (
                  <Box mt="10px">
                    <Text
                      display="flex"
                      alignItems={"center"}
                      gap={3}
                      cursor={"pointer"}
                      _hover={{ opacity: 0.7 }}
                      onClick={() =>
                        setChangePassword((beforeState) => !beforeState)
                      }
                    >
                      {!changePassword ? <TbLockOpen /> : <TbX />}
                      {!changePassword
                        ? "Deseja Editar a senha?"
                        : "Cancelar edição de senha."}
                    </Text>
                    {changePassword ? <PasswordInputs errors={errors} /> : null}
                  </Box>
                ) : (
                  <PasswordInputs errors={errors} />
                )}
                <Button
                  color="#222"
                  colorScheme="yellow"
                  size="md"
                  w="100%"
                  mt="5"
                  type="submit"
                  isLoading={isLoading}
                >
                  {admin.idAdmin ? "Salvar" : "Cadastrar"}
                </Button>
              </form>
            </FormProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
