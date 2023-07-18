import { useEffect, useState } from "react";
import { TRegisterPointsData } from "../RegisterPoints/types";
import { useUserRequest } from "../../Admin/User/hooks/useUserRequest";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useRegisterPointsRequest } from "../RegisterPoints/hooks/useRegisterPointsRequest";
import { TitleWithBackButton } from "../../../components/TitleWithBackButton";
import { Box, Image, Text, Link, Card } from "@chakra-ui/react";
import loadingGif from "../../../assets/loading-gif.gif";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { TbTrophy } from "react-icons/tb";
import { ButtonExercise } from "../../../components/ButtonExercise";

type TData = {
  idStudentPoints: number;
  exerciseName: string;
  createdAt: string;
} & TRegisterPointsData;

export const PersonalRecords = () => {
  const [data, setData] = useState<TData[]>([]);
  const apiUser = useUserRequest();
  const apiRegisterPointsRequest = useRegisterPointsRequest();
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();

  const getStudentPointByStudentId = async () => {
    try {
      const { data: studentData } = await apiUser.getStudentByUserId(
        currentUser.idUser
      );
      const { data: studentPointsData } =
        await apiRegisterPointsRequest.getByStudentId(studentData.idStudent);
      const data = studentPointsData
        .map((item: TData) => {
          return {
            idStudentPoints: item.idStudentPoints,
            exerciseName: item.exerciseName,
            idStudent: item.idStudent,
            idExercise: item.idExercise,
            points: item.points,
            createdAt: format(new Date(item.createdAt), "dd/MM/yyyy"),
          };
        })
        .sort((a: TData, b: TData) => b.points - a.points);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (currentUser.idUser) {
      getStudentPointByStudentId();
    }
  }, []);

  if (data?.length === 0) {
    return (
      <Box
        p="20px"
        textAlign={"center"}
        mt="30px"
        w="100%"
        display="flex"
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image src={loadingGif} width={"200px"} />
        <Text fontSize={"18px"} mt="16px">
          Você não possui pontuação ainda.{" "}
          <Link
            onClick={() => navigate("/student/register-points")}
            color="blue"
            textDecoration={"underline"}
          >
            clique aqui{" "}
          </Link>
          para começar agora a registrar seus pontos.
        </Text>
      </Box>
    );
  }
  return (
    <Box p="10px">
      <TitleWithBackButton title="Record Pessoal" />
      <Box display={"flex"} flexDir={"column"} gap={5}>
        {data?.map((item) => (
          <Card
            key={item.idStudentPoints}
            p="10px"
            display={"flex"}
            flexDir={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box gap={2}>
              <Text>Exercíco: {item.exerciseName}</Text>
              <Text>Pontuação: {item.points}pts</Text>
              <Text>Registrado em: {item.createdAt}</Text>
            </Box>
            <Box>
              <TbTrophy size={42} />
            </Box>
          </Card>
        ))}
      </Box>
      <ButtonExercise />
    </Box>
  );
};
