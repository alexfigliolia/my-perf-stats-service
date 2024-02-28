import { BaseSubscription } from "@alexfigliolia/my-performance-async";
import {
  AsyncServiceRequest,
  AsyncServiceSubscription,
} from "@alexfigliolia/my-performance-clients";
import { nextRepositoryStatsPullJob, repositoryStatsPulls } from "GQL";
import type {
  NextRepositoryStatsPullJobQuery,
  NextRepositoryStatsPullJobQueryVariables,
  RepositoryStatsPullsSubscription,
  RepositoryStatsPullsSubscriptionVariables,
} from "GQL/AsyncService/Types";
import { RepositoryStatsPull } from "Pulls";
import type { Config, IncomingJob } from "./types";

export class RepositoryStatsPulls extends BaseSubscription<
  Config,
  RepositoryStatsPull
> {
  public stream = new AsyncServiceSubscription<
    RepositoryStatsPullsSubscription,
    RepositoryStatsPullsSubscriptionVariables
  >(repositoryStatsPulls, {});

  public initialize() {
    void this.poll();
    this.stream.open();
    this.stream.onData(response => {
      if (!response.data?.repositoryStatsPulls) {
        return;
      }
      const { repositoryStatsPulls: next } = response.data;
      if (next) {
        const config = this.parseResponse(next);
        this.onStream(config);
      }
    });
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
      this.onPoll(null);
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
