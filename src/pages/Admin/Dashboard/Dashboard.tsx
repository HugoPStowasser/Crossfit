import { Box, Divider, Grid, GridItem } from "@chakra-ui/react";
import { NextClassesInfo } from "./components/NextClassesInfo";
import { RecentPayments } from "./components/RecentPayments";
import { StudentNonPaying } from "./components/StudentsNonPaying";

export const Dashboard = () => {
  return (
    <Box display={"flex"} w="100%" p="70px">
      <Grid templateRows="repeat(1, 1fr)" w="100%" gap={5}>
        <GridItem colSpan={2}>
          <NextClassesInfo />
        </GridItem>
        <GridItem colSpan={2} mt="30px">
          <RecentPayments />
        </GridItem>
        <GridItem colSpan={2} mt="50px" p="20px" borderRadius={8}>
          <StudentNonPaying />
        </GridItem>
      </Grid>
    </Box>
  );
};
