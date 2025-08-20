import { delay, http, HttpResponse } from "msw";
import { fakeMeals } from "./meal";
import { fakeColumns } from "./columns";
import { myExerciseData } from "./exercise";
import { myDiaryData } from "./diary";

export const handlers = [
  http.get("/api/get-meals", async() => {
    await delay(1000);
    return HttpResponse.json(fakeMeals);
  }),
  http.get("/api/get-columns", async() => {
    await delay(1000);
    return HttpResponse.json(fakeColumns);
  }),
  http.get("/api/get-exercise", async() => {
    await delay(1000);
    return HttpResponse.json(myExerciseData);
  }),
  http.get("/api/get-diary", async() => {
    await delay(1000);
    return HttpResponse.json(myDiaryData);
  }),
];
