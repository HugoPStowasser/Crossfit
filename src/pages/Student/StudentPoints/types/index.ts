export type TStudentPointsData = {
  IdStudent: number;
  IdExercise: number;
  Points: number;
};

export type TExerciseHttp = {
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  idExercise: number;
  description: string;
};

export type TExerciseData = {
  idExercise: number;
  description: string;
};