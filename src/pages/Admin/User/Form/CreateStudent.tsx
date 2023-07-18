import { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { TitleWithBackButton } from "../../../../components/TitleWithBackButton";
import { useStudent } from "../hooks/useStudent";
import { FormProvider } from "react-hook-form";
import { TbLockOpen, TbX } from "react-icons/tb";
import { InputBase } from "../../../../components/InputBase";
import { Loading } from "../../../../components/Loading";
import { formatISO, parseISO } from "date-fns";
import { SelectBase } from "../../../../components/SelectBase";
import { PasswordInputs } from "../../../../components/PasswordInputs";

export const CreateStudent = () => {
  const [changePassword, setChangePassword] = useState(false);
  const {
    onSubmit,
    isLoading,
    student,
    formMethods,
    loadingRef,
    allGenders,
    getAllGender,
  } = useStudent();

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

  useEffect(() => {
    if (!changePassword) {
      setValue("password", "");
      setValue("confirmPassword", "");
    }
  }, [changePassword]);

  return (
    <Box p="15px">
      <Loading ref={loadingRef} />
      <TitleWithBackButton title="Cadastrar Estudante" />
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
                  label="Nome:"
                  inputName="name"
                  placeholder="Fulano de Tal"
                  errorMessage={errors.name?.message}
                />
                <InputBase
                  label="Nome Social:"
                  inputName="socialName"
                  placeholder="Fulano"
                  errorMessage={errors.socialName?.message}
                />
                <InputBase
                  label="E-mail:"
                  inputName="email"
                  placeholder="fulanodetal@email.com"
                  errorMessage={errors.email?.message}
                />
                <InputBase
                  label="Data de Nascimento:"
                  inputName="birthDate"
                  placeholder="Data de Nascimento"
                  type="date"
                  errorMessage={errors.birthDate?.message}
                />
                <Text
                  color="gray.500"
                  fontSize="sm"
                  fontWeight={500}
                  mb="-20px"
                  mt="20px"
                >
                  Gênero:
                </Text>
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
                  {student.idStudent ? "Salvar" : "Cadastrar"}
                </Button>
              </form>
            </FormProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
