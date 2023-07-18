import {
  Box,
  Card,
  Grid,
  GridItem,
  Heading,
  Image,
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { TitleWithBackButton } from "../../../components/TitleWithBackButton";
import { useEffect, useState } from "react";
import { useClassRequest } from "./hooks/useClassRequest";
import { useParams } from "react-router-dom";
import { TClassHttp, TMapperHttpToTable } from "./types";
import { mapperHttpToTable } from "./mappers";
import loadingGif from "../../../assets/loading-gif.gif";

export const ViewClass = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<TMapperHttpToTable>(
    {} as TMapperHttpToTable
  );
  const apiClass = useClassRequest();
  const { idClass } = useParams();

  const getClassById = async () => {
    setLoading(true);
    const { data }: { data: TClassHttp } = await apiClass.getById(
      Number(idClass)
    );
    setData(mapperHttpToTable([data])[0]);
    setLoading(false);
  };
  useEffect(() => {
    if (idClass && !data?.idClass) {
      getClassById();
    }
  }, [idClass]);
  return (
    <Box p="15px">
      <TitleWithBackButton title="Detalhes da aula" />
      {isLoading ? (
        <Box padding="5" boxShadow="xl" bg="white" borderRadius={8}>
          <SkeletonText mt="4" noOfLines={8} spacing="4" skeletonHeight="2" />
        </Box>
      ) : (
        <>
          <Card mt="50px" p="10px" gap={5} boxShadow="xl">
            <Text fontSize={"20px"} fontWeight={500}>
              {data.name}
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" w="100%" gap={2}>
              <GridItem colSpan={1}>
                <Text>Data: {data.date}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text>Professor: {data.professor}</Text>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" w="100%" gap={2}>
              <GridItem colSpan={1}>
                <Text>Hora de Início: {data.startHour}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text>Hora de Fim: {data.endHour}</Text>
              </GridItem>
            </Grid>
            <Text>
              <span>Descrição da Aula: </span>
              {data.description}
            </Text>
          </Card>
          {data?.confirmedStudents && data?.confirmedStudents?.length > 0 ? (
            <Box mt="50px">
              <Heading size="md" mb="10px">
                Alunos Confirmados
              </Heading>
              <TableContainer>
                <Table variant="simple" size={"md"}>
                  <Thead>
                    <Tr>
                      <Th>#</Th>
                      <Th>Nome</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.confirmedStudents?.map((item, index) => (
                      <Tr key={item.idStudent}>
                        <Td>{index + 1}</Td>
                        <Td>{item.name}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Box
              mt="30px"
              w="100%"
              display="flex"
              flexDir={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image src={loadingGif} width={"200px"} />
              <Text>Nenhum Aluno Confirmado</Text>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
