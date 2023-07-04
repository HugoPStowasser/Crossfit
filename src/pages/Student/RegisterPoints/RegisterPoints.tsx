import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from "@chakra-ui/react";
import { TitleWithBackButton } from "../../../components/TitleWithBackButton";
import { Loading } from "../../../components/Loading";
import { FormProvider } from "react-hook-form";
import { SelectBase } from "../../../components/SelectBase";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useRegisterPoints } from "./hooks/useRegisterPoints";

export const RegisterPoints = () => {
  const { loadingRef, formMethods, onSubmit, getAllExercises, allExercises } =
    useRegisterPoints();

  const {
    setValue,
    register,
    getValues,
    formState: { errors },
  } = formMethods;

  const handleSaveAndContinue = () => {
    onSubmit(true)();
  };
  const handleSaveAndExit = () => {
    onSubmit()();
  };

  const handleScoreChange = (valueString: string, valueNumber: number) => {
    console.log(valueString);
    if (isNaN(valueNumber)) {
      setValue("points", 0);
    } else {
      setValue("points", valueNumber);
    }
  };

  const handleIncrement = () => {
    const { points } = getValues();
    setValue("points", points + 1);
  };

  const handleDecrement = () => {
    const { points } = getValues();
    if (points > 0) {
      setValue("points", points - 1);
    }
  };

  return (
    <Box my="20px" px="15px">
      <Loading ref={loadingRef} />
      <TitleWithBackButton title="Registar Pontuação" />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
      >
        <Box width={"80%"} maxW={"720px"} mt="100px">
          <FormProvider {...formMethods}>
            <SelectBase
              onFocus={getAllExercises}
              options={allExercises}
              inputName="exercise"
              errorMessage={errors.exercise?.message}
            />
            <FormControl mb={4} mt="20px">
              <FormLabel>Pontuação</FormLabel>
              <Flex align="center">
                <IconButton
                  icon={<MinusIcon />}
                  onClick={handleDecrement}
                  aria-label="Decrement"
                  mr={2}
                />
                <NumberInput
                  name="points"
                  ref={register("points").ref}
                  onChange={handleScoreChange}
                  w="100%"
                  allowMouseWheel
                >
                  <NumberInputField />
                  <NumberInputStepper></NumberInputStepper>
                </NumberInput>
                <IconButton
                  icon={<AddIcon />}
                  onClick={handleIncrement}
                  aria-label="Increment"
                  ml={2}
                />
              </Flex>
            </FormControl>
            <FormControl mb={4}>
              <Stack direction="row" spacing={4} justify="space-between">
                <Button
                  variant="outline"
                  w="100%"
                  onClick={() =>
                    setValue("points", formMethods.getValues("points") + 5)
                  }
                >
                  +5
                </Button>
                <Button
                  variant="outline"
                  w="100%"
                  onClick={() =>
                    setValue("points", formMethods.getValues("points") + 10)
                  }
                >
                  +10
                </Button>
                <Button
                  variant="outline"
                  w="100%"
                  onClick={() =>
                    setValue("points", formMethods.getValues("points") + 20)
                  }
                >
                  +20
                </Button>
              </Stack>
            </FormControl>
            <Stack direction="column" spacing={5} pt={5}>
              <Button
                colorScheme="white"
                color="green.500"
                borderColor="green.500"
                borderWidth="1px"
                onClick={handleSaveAndContinue}
              >
                Salvar e continuar
              </Button>
              <Button
                colorScheme="green"
                color="white"
                bg="green.500"
                onClick={handleSaveAndExit}
              >
                Salvar e sair
              </Button>
            </Stack>
          </FormProvider>
        </Box>
      </Box>
    </Box>
  );
};
