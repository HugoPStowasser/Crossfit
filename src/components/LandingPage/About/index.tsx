import { Box, Text } from "@chakra-ui/react";

const AboutComponent = () => {
  return (
    <Box margin="50px 0" px="30px" fontFamily={"Inter"} id="about">
      <Text fontSize={"24px"} fontWeight={"700"} letterSpacing={".01em"}>
        Sobre
      </Text>
      <Text fontSize={"16px"} letterSpacing={"2px"} mt="20px">
        Bem-vindo à nossa academia de CrossFit, 
        um espaço dedicado a ajudar você a alcançar seus objetivos de condicionamento físico e saúde. 
        Fundada em 2015, nossa academia tem sido uma referência na comunidade fitness, 
        proporcionando um ambiente acolhedor e motivador para todos os nossos clientes.
        <br />
        <br />
        Com uma equipe de instrutores altamente qualificados, 
        estamos comprometidos em orientar e apoiar você em cada etapa do caminho. 
        Nossa academia promove uma atmosfera de comunidade vibrante, onde a competição saudável e o trabalho em equipe são valorizados.
        <br />
        <br />
        Temos uma base de clientes satisfeitos, 
        que alcançaram resultados impressionantes em força, resistência, flexibilidade e composição corporal. 
        Se você está pronto para embarcar em uma jornada de transformação física e mental, 
        venha fazer parte da nossa comunidade e descubra o que é possível alcançar!
        <br />
        <br />
        Agende uma visita hoje mesmo e experimente o poder do CrossFit em primeira mão. 
        Estamos ansiosos para recebê-lo(a) e começar essa jornada incrível juntos.
      </Text>
    </Box>
  );
};

export const About = AboutComponent;
