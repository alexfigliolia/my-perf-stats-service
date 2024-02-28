export interface IUserContributions {
  email: string;
  lines: number;
  commits: number;
}

export interface IOverallContributions {
  users: IUserContributions[];
  lines: number;
  commits: number;
}

type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export type UserStats = KeysOfType<IUserContributions, number>;

export type UserStatKey = "commits" | "lines changed";
