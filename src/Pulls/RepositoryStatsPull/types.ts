export interface Options {
  id: number;
  token: string;
  clone_url: string;
  repositoryId: number;
  organizationId: number;
}

export interface IUserContributions {
  email: string;
  lines: number;
  commits: number;
}

export interface IOverallContributions {
  users: IUserContributions[];
  totalLines: number;
  totalCommits: number;
}

type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export type UserStats = KeysOfType<IUserContributions, number>;

export type UserStatKey = "commits" | "lines changed";
