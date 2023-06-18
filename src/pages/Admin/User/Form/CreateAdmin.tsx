import { useEffect, useState } from "react";
import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react";
import { TitleWithBackButton } from "../../../../components/TitleWithBackButton";
import { useAdmin } from "../hooks/useAdmin";
import { FieldErrors } from "react-hook-form";
import { TAdminFormValues } from "../types";
import { TbLockOpen, TbX } from "react-icons/tb";

const PasswordInputs = ({
  register,
  errors,
}: {
  register: any;
  errors: FieldErrors<TAdminFormValues>;
}) => {
  return (
    <>
      <FormControl mt="6">
        <Input {...register("password")} placeholder="Senha" type="password" />
        {errors.password && (
          <Text color="red.500" fontSize={"sm"} pt="5px">
            {errors.password?.message}
          </Text>
        )}
      </FormControl>
      <FormControl mt="6">
        <Input
          {...register("confirmPassword")}
          placeholder="Confirmar Senha"
          type="password"
        />
        {errors.confirmPassword && (
          <Text color="red.500" fontSize={"sm"} pt="5px">
            {errors.confirmPassword?.message}
          </Text>
        )}
      </FormControl>
    </>
  );
};

export const CreateAdmin = () => {
  const [changePassword, setChangePassword] = useState(false);
  const { onSubmit, register, errors, isLoading, admin, setValue } = useAdmin();

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
      <TitleWithBackButton title="Cadastrar Admin" />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        pt="100px"
      >
        <Box width={"80%"} maxW={"720px"}>
          <Box mt="100px">
            <form onSubmit={onSubmit}>
              <FormControl mt="6">
                <Input {...register("name")} placeholder="Nome" />
                {errors.name && (
                  <Text color="red.500" fontSize={"sm"} pt="5px">
                    {errors.name?.message}
                  </Text>
                )}
              </FormControl>
              <FormControl mt="6">
                <Input {...register("socialName")} placeholder="Nome Social" />
                {errors.socialName && (
                  <Text color="red.500" fontSize={"sm"} pt="5px">
                    {errors.socialName?.message}
                  </Text>
                )}
              </FormControl>
              <FormControl mt="6">
                <Input
                  {...register("email")}
                  placeholder="E-mail"
                  type="email"
                />
                {errors.email && (
                  <Text color="red.500" fontSize={"sm"} pt="5px">
                    {errors.email?.message}
                  </Text>
                )}
              </FormControl>
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
                  {changePassword ? (
                    <PasswordInputs register={register} errors={errors} />
                  ) : null}
                </Box>
              ) : (
                <PasswordInputs register={register} errors={errors} />
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
