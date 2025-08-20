import type { DiaryItem } from "../pages/myRecord/type";
import axiosClient from "./axiosClient";

export const getDiaryApi = async (): Promise<DiaryItem[]> => {
  const response = await axiosClient.get<DiaryItem[]>("/get-diary");
  return response.data;
};
