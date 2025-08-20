import type { ColumnData } from "../pages/myColumn/type";
import axiosClient from "./axiosClient";

export const getColumnsApi = async (): Promise<ColumnData[]> => {
  const response = await axiosClient.get<ColumnData[]>("/get-columns");
  return response.data;
};
