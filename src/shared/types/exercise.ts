export type TExerciseStatus = 1 | 2 | 3;

export const enum TExerciseStatuses {
  "NOT_STARTED" = 1,
  "PROCESS",
  "FINISHED",
}

export type TExercise = {
  id: number;
  name: string;
  started_at: string;
  time_spent: string;
  status: TExerciseStatus;
};

export type TExerciseRequest = {
  name: string;
};
