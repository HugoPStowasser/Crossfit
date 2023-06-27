import { useClass } from "../../Class/hooks/useClass";

export const useDashboard = () => {
  const { allClasses, isLoading: nextClassesIsLoading } = useClass();

  // const getNextClasses = async () => {
  //   await getAllClasses();
  // };

  return {
    nextClassesIsLoading,
    allClasses,
    // getNextClasses,
  };
};
