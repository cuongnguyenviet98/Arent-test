import type { ExerciseItem } from "../pages/myRecord/type";
import axiosClient from "./axiosClient";

export const getExerciseApi = async (): Promise<ExerciseItem[]> => {
  const response = await axiosClient.get<ExerciseItem[]>("/get-exercise");
  return response.data;
};
