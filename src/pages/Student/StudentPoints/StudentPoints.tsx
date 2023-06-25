import React, { useState } from "react";
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
  Select,
  Stack,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { TitleWithBackButton } from "../../../components/TitleWithBackButton";

export const StudentPoints = () => {
  const [exercise, setExercise] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const handleExerciseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExercise(e.target.value);
  };

  const handleScoreChange = (valueString: string, valueNumber: number) => {
    if (isNaN(valueNumber)) {
      setScore(0);
    } else {
      setScore(valueNumber);
    }
  };

  const handleIncrement = () => {
    setScore((prevScore) => prevScore + 1);
  };

  const handleDecrement = () => {
    if (score > 0) {
      setScore((prevScore) => prevScore - 1);
    }
  };

  const handleSaveAndContinue = () => {
    setExercise("");
    setScore(0);
    console.log("Save and continue clicked");
  };

  const handleSaveAndExit = () => {
    // Lógica de salvar e sair
    console.log("Save and exit clicked");
  };

  return (
    <Box p="15px">
    <TitleWithBackButton title={`Adicionar pontuação`} />
  
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDir={"column"}
    >
      <Box width={"80%"} maxW={"720px"}>
        <Box mt="100px">
          <FormControl mb={4} pt={20}>
            <FormLabel>Exercício</FormLabel>
            <Select value={exercise} onChange={handleExerciseChange}>
              <option value="exercicio1">Exercício 1</option>
              <option value="exercicio2">Exercício 2</option>
              <option value="exercicio3">Exercício 3</option>
            </Select>
          </FormControl>
  
          <FormControl mb={4}>
            <FormLabel>Pontuação</FormLabel>
            <Flex align="center">
              <IconButton
                icon={<MinusIcon />}
                onClick={handleDecrement}
                aria-label="Decrement"
                mr={2}
              />
              <NumberInput
                value={score}
                onChange={handleScoreChange}
                min={0}
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
                onClick={() => handleScoreChange("", score + 5)}
              >
                +5
              </Button>
              <Button
                variant="outline"
                w="100%"
                onClick={() => handleScoreChange("", score + 10)}
              >
                +10
              </Button>
              <Button
                variant="outline"
                w="100%"
                onClick={() => handleScoreChange("", score + 20)}
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
        </Box>
      </Box>
    </Box>
  </Box>
  );
};
