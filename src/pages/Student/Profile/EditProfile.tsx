import { Box, Button, Text } from "@chakra-ui/react";
import { Loading } from "../../../components/Loading";
import { TitleWithBackButton } from "../../../components/TitleWithBackButton";
import { FormProvider } from "react-hook-form";
import { InputBase } from "../../../components/InputBase";
import { SelectBase } from "../../../components/SelectBase";
import { PasswordInputs } from "../../../components/PasswordInputs";
import { useEffect, useState } from "react";
import { TbLockOpen, TbX } from "react-icons/tb";
import { useEditProfile } from "./hooks/useEditProfile";
import { formatISO, parseISO } from "date-fns";

export const EditProfile = () => {
  const [changePassword, setChangePassword] = useState(false);
  const {
    loadingRef,
    formMethods,
    onSubmit,
    isLoading,
    getAllGender,
    allGenders,
    student,
  } = useEditProfile();

  const {
    setValue,
    formState: { errors },
  } = formMethods;
  useEffect(() => {
    if (student.idStudent) {
      setValue("name", student.name);
      setValue("socialName", student.socialName);
      setValue("email", student.email);
      const formattedBirthDate = formatISO(parseISO(student.birthDate), {
        representation: "date",
      });
      setValue("birthDate", formattedBirthDate);
      setValue("gender", String(student.idGender));
    }
  }, [student]);

  return (
    <Box p="15px">
      <Loading ref={loadingRef} />
      <TitleWithBackButton title="Editar Perfil" />
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
                <InputBase
                  inputName="birthDate"
                  placeholder="Data de Nascimento"
                  type="date"
                  errorMessage={errors.birthDate?.message}
                />
                <SelectBase
                  onFocus={getAllGender}
                  options={allGenders}
                  inputName="gender"
                  errorMessage={errors.gender?.message}
                />
                {student.idStudent ? (
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
                  Salvar
                </Button>
              </form>
            </FormProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
