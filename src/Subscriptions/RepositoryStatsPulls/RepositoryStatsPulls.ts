import { BaseSubscription } from "@alexfigliolia/my-performance-async";
import { AsyncServiceRequest } from "@alexfigliolia/my-performance-clients";
import { nextRepositoryStatsPullJob } from "GQL";
import type {
  NextRepositoryStatsPullJobQuery,
  NextRepositoryStatsPullJobQueryVariables,
} from "GQL/AsyncService/Types";
import { RepositoryStatsPull } from "Pulls";
import type { Config, IncomingJob } from "./types";

export class RepositoryStatsPulls extends BaseSubscription<
  Config,
  RepositoryStatsPull
> {
  public initialize() {
    void this.poll();
    return this;
  }

  public async poll() {
    try {
      const response = await AsyncServiceRequest<
        NextRepositoryStatsPullJobQuery,
        NextRepositoryStatsPullJobQueryVariables
      >({
        query: nextRepositoryStatsPullJob,
        variables: {},
      });
      const config = this.parseResponse(
        response.data.nextRepositoryStatsPullJob,
      );
      this.onPoll(config);
    } catch (error) {
      this.activatePollInterval();
    }
  }

  public createPull(job: Config) {
    return new RepositoryStatsPull(job);
  }

  private parseResponse(job: IncomingJob) {
    const { jobId, ...rest } = job;
    return { id: jobId, ...rest };
  }
}
