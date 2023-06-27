import { Box, Button, Text } from "@chakra-ui/react";
import { CardClass } from "../../../../../components/CardClass";
import { TMapperHttpToTable } from "../../../../Admin/Class/types";
import dayjs from "dayjs";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { useStudent } from "../../../../../hooks/useStudent";
import { Loading, TLoadingRef } from "../../../../../components/Loading";
type TClassList = {
  classesData: TMapperHttpToTable[];
};
export const ClassList = ({ classesData }: TClassList) => {
  const loadingRef = useRef<TLoadingRef>(null);
  const { checkin, checkout, isLoading } = useStudent();
  const [allData, setAllData] = useState(classesData.slice(0, 1));
  if (classesData.length === 0) return <></>;

  const handleSeeMore = () => {
    setAllData(classesData);
  };

  const handleSeeLess = () => {
    setAllData(classesData.slice(0, 1));
  };

  const handleCheckin = async (idClass: number) => {
    return checkin(idClass);
  };
  const handleCheckout = async (idClass: number) => {
    return checkout(idClass);
  };

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.onOpenLoading();
    } else {
      loadingRef.current?.onCloseLoading();
    }
  }, [isLoading]);

  return (
    <>
      <Loading ref={loadingRef} />
      {allData.map((item) => (
        <Box key={item.idClass}>
          <CardClass
            checkinFn={() => handleCheckin(item.idClass)}
            checkoutFn={() => handleCheckout(item.idClass)}
            checkin={Boolean(item.checkin)}
            title={item.name}
            description={item.description}
            datetime={`${dayjs(item.date, "DD/MM/YYYY").format("D [de] MMMM")}
        ${item.startHour} - ${item.endHour}`}
            professor={item.professor}
          />
          <Box
            w="100%"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          ></Box>
        </Box>
      ))}
      {classesData.length > 1 && (
        <Box w="100%" display={"flex"} justifyContent={"center"}>
          <Button
            onClick={
              classesData.length === allData.length
                ? handleSeeLess
                : handleSeeMore
            }
            textAlign={"center"}
            w="100px"
            h="auto"
            p="5px"
            borderRadius={"full"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
          >
            <Text fontSize={"14px"}>
              {classesData.length === allData.length ? "Ver menos" : "Ver mais"}
            </Text>
            {classesData.length === allData.length ? (
              <TbChevronUp size={18} />
            ) : (
              <TbChevronDown size={18} />
            )}
          </Button>
        </Box>
      )}
    </>
  );
};
