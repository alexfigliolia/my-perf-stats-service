import type { Schedule } from "GQL/AsyncService/Types";

export interface Options {
  id: number;
  token: string;
  clone_url: string;
  date?: string | null;
  repositoryId: number;
  organizationId: number;
  range?: Schedule | null;
}
