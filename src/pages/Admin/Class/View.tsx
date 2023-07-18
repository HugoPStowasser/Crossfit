import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { TitleWithBackButton } from "../../../components/TitleWithBackButton";

export const ViewClass = () => {
  return (
    <Box p="15px">
      <TitleWithBackButton title="Detalhes da aula" />
      <Box
        mt="30px"
        bg="gray.300"
        display="flex"
        w="100%"
        flexDir={"column"}
        p="10px"
        borderRadius={4}
      >
        <Grid templateRows="repeat(2, 1fr)" w="100%" fontSize={"16px"}>
          <GridItem colSpan={1}>
            <Text>Aula Teste</Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Text>Professor: José</Text>
          </GridItem>
        </Grid>
        <Grid templateRows="repeat(2, 1fr)" w="100%">
          <GridItem colSpan={1}>
            <Text>Data: 18/04/2023</Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Text>Hora de Início: 18h00</Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Text>Hora de Fim: 20h00</Text>
          </GridItem>
        </Grid>
        <Text mt="20px">
          Descrição: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Maecenas feugiat lorem eget urna imperdiet ornare. Vivamus malesuada
          ac orci vestibulum facilisis. Integer in nisi sem. Morbi vitae justo
          sapien. Proin bibendum justo id mauris tempus dictum. Cras quis tellus
          ac libero imperdiet lobortis. Etiam vel erat ac odio sodales aliquam
          eu sed mauris. Phasellus cursus congue elit suscipit cursus.
          Vestibulum non fermentum turpis.
        </Text>
      </Box>
    </Box>
  );
};
