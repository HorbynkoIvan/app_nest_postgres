export interface JWTUserInterface {
  username: string;
  role: "admin" | "guest";
  email: string;
}

export enum EntType {
  SYSTEM = "system",
  STATE = "state",
  DISTRICT = "district",
  SCHOOL = "school",
  COHORT = "cohort",
  OTHER = "other",
}

export type PaginationInput = Partial<{
  page: number;
  pageSize: number;
  getAll: boolean;
}>;
