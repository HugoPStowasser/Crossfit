import { Box, Grid, GridItem } from "@chakra-ui/react";
import { NextClassesInfo } from "./components/NextClassesInfo";
import { RecentPayments } from "./components/RecentPayments";
import { StudentNonPaying } from "./components/StudentsNonPaying";

export const Dashboard = () => {
  return (
    <Box display={"flex"} w="100%" p="70px">
      <Grid templateRows="repeat(2, 1fr)" w="100%" gap={5}>
        <GridItem colSpan={[2, 2, 2, 1]}>
          <RecentPayments />
        </GridItem>
        <GridItem colSpan={[2, 2, 2, 1]}>
          <NextClassesInfo />
        </GridItem>
        <GridItem
          colSpan={2}
          mt="50px"
          p="20px"
          bg="blackAlpha.300"
          borderRadius={8}
        >
          <StudentNonPaying />
        </GridItem>
      </Grid>
    </Box>
  );
};
