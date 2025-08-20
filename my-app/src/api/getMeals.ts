import type { MealDay } from "../pages/myPage/type";
import axiosClient from "./axiosClient";

export const getMealsApi = async (): Promise<MealDay[]> => {
  const response = await axiosClient.get<MealDay[]>("/get-meals");
  return response.data;
};
