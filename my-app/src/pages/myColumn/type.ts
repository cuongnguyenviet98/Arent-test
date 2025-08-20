export interface ColumnItem {
  time: string;
  image: string;
  title: string;
  subTitle: string;
}

export interface ColumnData {
  date: string;
  column: ColumnItem[];
}