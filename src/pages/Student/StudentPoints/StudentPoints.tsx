import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { TExerciseData, TExerciseHttp } from "../../Admin/Exercise/types";
import { useExercise } from "../../Admin/Exercise/hooks/useExercise";
import { useStudentPointsRequest } from "./hooks/useStudentPointsRequest";
import { TStudentPointsData } from "./types";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

export const StudentPoints = () => {
  const [exercise, setExercise] = useState<TExerciseData[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<number | undefined>(undefined);
  const [score, setScore] = useState<number>(0);
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const apiExercise = useExercise();
  const apiStudentPoints = useStudentPointsRequest();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseData: TExerciseHttp[] = await apiExercise.getAllExercises();
      const transformedData: TExerciseData[] = responseData.map((item) => ({
        idExercise: item.idExercise,
        description: item.description,
      }));
      setExercise(transformedData);
    } catch (error) {
      console.error('Erro ao buscar dados do backend:', error);
    }
  };

  const handleExerciseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIdExercise = parseInt(event.target.value);
    setSelectedExercise(selectedIdExercise);
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

  const handleSaveAndContinue = async () => {
    try {
      const studentPointsData: TStudentPointsData = {
        IdStudent: currentUser.idUser,
        IdExercise: selectedExercise || 0,
        Points: score,
      };
      await apiStudentPoints.insert(studentPointsData);
      setScore(0);
    } catch (error) {
      console.error("Erro ao salvar pontos do estudante:", error);
    }
  };

  const handleSaveAndExit = async () => {
    try {
      const studentPointsData: TStudentPointsData = {
        IdStudent: currentUser.idUser,
        IdExercise: selectedExercise || 0,
        Points: score,
      };
      await apiStudentPoints.insert(studentPointsData);
      navigate(-1);
    } catch (error) {
      console.error("Erro ao salvar pontos do estudante:", error);
    }
  };

  return (
    <Box p="15px">
    <TitleWithBackButton title={`Adicionar pontuação`} />

    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <Box width="80%" maxW="720px" mt="100px">
        <FormControl mb={4} pt={20}>
          <FormLabel>Exercício</FormLabel>
          <Select value={selectedExercise || ''} onChange={handleExerciseChange}>
            {exercise.map((exercise) => (
              <option key={exercise.idExercise} value={exercise.idExercise}>
                {exercise.description}
              </option>
            ))}
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
  );
};
