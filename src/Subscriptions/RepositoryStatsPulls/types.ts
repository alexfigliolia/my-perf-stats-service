import type { RepositoryStatsPullJob } from "GQL/AsyncService/Types";

export type Config = Omit<RepositoryStatsPullJob, "jobId">;

export type IncomingJob = Omit<RepositoryStatsPullJob, "id">;
