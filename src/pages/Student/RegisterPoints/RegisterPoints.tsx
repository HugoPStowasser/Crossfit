import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

export const RegisterPoints = () => {
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
    // Lógica de salvar e continuar
    console.log("Save and continue clicked");
  };

  const handleSaveAndExit = () => {
    // Lógica de salvar e sair
    console.log("Save and exit clicked");
  };

  return (
    <Flex align="center" justify="center" minHeight="100vh">
      <Box p={4}>
        <FormControl mb={4}>
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
              allowMouseWheel
            >
              <NumberInputField />
              <NumberInputStepper>
              </NumberInputStepper>
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
          <FormLabel>Adicionar Pontuação</FormLabel>
          <Stack direction="row" spacing={4} justify="space-between">
            <Button variant="outline" onClick={() => handleScoreChange("", score + 5)}>
              +5
            </Button>
            <Button variant="outline" onClick={() => handleScoreChange("", score + 10)}>
              +10
            </Button>
            <Button variant="outline" onClick={() => handleScoreChange("", score + 20)}>
              +20
            </Button>
          </Stack>
        </FormControl>

        <Stack direction="column" spacing={2}>
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
    </Flex>
  );
};
