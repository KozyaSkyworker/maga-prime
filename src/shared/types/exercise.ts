import { TUrlDto } from "./url";

export type TExerciseStatus = 1 | 2 | 3;

export const EXERCISE_STATUS_NAMES = ["Не начато", "В прооцессе", "Заверешено"];

export const enum TExerciseStatuses {
  "NOT_STARTED" = 1,
  "PROCESS",
  "FINISHED",
}

export type TExerciseDto = {
  id: number;
  created_at: string;
  started_at: string;
  stopped_at: string | null;
  time_spent: string;
  name: string;
  status: TExerciseStatus;
  user_id: number;
};

export type TExercise = {
  exercise: TExerciseDto;
  urls: TUrlDto[];
};

export type TExerciseRequest = {
  name: string;
  user_id: number;
};

export type TExerciseUpdateRequest = Partial<
  Omit<TExerciseDto, "id" | "created_at" | "user_id">
>;
