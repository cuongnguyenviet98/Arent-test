export interface Meal {
  name: string;
  image: string;
}

export interface MealDay {
  date: string;
  meals: Meal[];
}