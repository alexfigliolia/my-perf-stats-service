export interface Options {
  id: number;
  token: string;
  api_url: string;
  pageSize: number;
  platform: Platform;
  currentPage: number;
  organizationId: number;
  requestMethod: "GET" | "POST";
}

export type Platform = "github" | "bitbucket";
