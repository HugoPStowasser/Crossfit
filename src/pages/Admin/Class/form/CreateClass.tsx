import { Box, Button, Text } from "@chakra-ui/react";
import { useClass } from "../hooks/useClass";
import { TitleWithBackButton } from "../../../../components/TitleWithBackButton";
import { useEffect } from "react";
import { InputBase } from "../../../../components/InputBase";
import { Controller, FormProvider } from "react-hook-form";
import { Loading } from "../../../../components/Loading";
import { SelectBase } from "../../../../components/SelectBase";
import { TimePicker } from "antd";
import dayjs from "dayjs";

export const CreateClass = () => {
  const {
    formMethods,
    onSubmit,
    isLoading,
    classData,
    loadingRef,
    getAllProfessors,
    allProfessors,
  } = useClass();
  const {
    setValue,
    control,
    formState: { errors },
  } = formMethods;

  useEffect(() => {
    if (classData.idClass) {
      setValue("name", classData.name);
      setValue("description", classData.description);
      setValue("date", classData.date);
      setValue("startHour", classData.startHour);
      setValue("endHour", classData.endHour);
    }
  }, [classData]);

  return (
    <Box p="15px">
      <Loading ref={loadingRef} />
      <TitleWithBackButton title="Cadastrar Aula" />
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
                  placeholder="Nome da Aula"
                  errorMessage={errors.name?.message}
                />
                <InputBase
                  inputName="description"
                  placeholder="Descrição da aula"
                  errorMessage={errors.description?.message}
                />
                <InputBase
                  inputName="date"
                  placeholder="Data da aula"
                  type="date"
                  errorMessage={errors.date?.message}
                />
                <Box
                  mt="1.5rem"
                  display={"flex"}
                  flexDir={"column"}
                  gap={5}
                  alignItems={"start"}
                >
                  <Controller
                    control={control}
                    name="startHour"
                    render={({ field: { onChange, value } }) => (
                      <Box w="100%">
                        <Text>Hora inicial</Text>
                        <TimePicker
                          style={{ width: "100%", height: "40px" }}
                          format={"HH:mm"}
                          onChange={onChange}
                          value={value ? dayjs(value, "HH:mm") : null}
                        />
                        {errors && (
                          <Text color="red.500" fontSize={"sm"} pt="5px">
                            {errors.startHour?.message}
                          </Text>
                        )}
                      </Box>
                    )}
                  />
                  <Controller
                    control={control}
                    name="endHour"
                    render={({ field: { onChange, value } }) => (
                      <Box w="100%">
                        <Text>Hora Final</Text>
                        <TimePicker
                          style={{ width: "100%", height: "40px" }}
                          format={"HH:mm"}
                          onChange={onChange}
                          value={value ? dayjs(value, "HH:mm") : null}
                        />
                        {errors && (
                          <Text color="red.500" fontSize={"sm"} pt="5px">
                            {errors.endHour?.message}
                          </Text>
                        )}
                      </Box>
                    )}
                  />
                </Box>
                <SelectBase
                  onFocus={getAllProfessors}
                  options={allProfessors}
                  inputName="professors"
                  errorMessage={errors.professors?.message}
                />
                <Button
                  color="#222"
                  colorScheme="yellow"
                  size="md"
                  w="100%"
                  mt="5"
                  type="submit"
                  isLoading={isLoading}
                >
                  Cadastrar
                </Button>
              </form>
            </FormProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
