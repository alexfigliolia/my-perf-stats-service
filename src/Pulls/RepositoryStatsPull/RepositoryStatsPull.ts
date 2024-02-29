import { Pull } from "@alexfigliolia/my-performance-async";
import {
  AsyncServiceRequest,
  CoreServiceRequest,
} from "@alexfigliolia/my-performance-clients";
import { ChildProcess } from "@figliolia/child-process";
import { setRepositoryStats, setRepositoryStatsJobStatus } from "GQL";
import type {
  SetRepositoryStatsJobStatusMutation,
  SetRepositoryStatsJobStatusMutationVariables,
} from "GQL/AsyncService/Types";
import { JobStatus } from "GQL/AsyncService/Types";
import type {
  SetRepositoryStatsMutation,
  SetRepositoryStatsMutationVariables,
} from "GQL/CoreService/Types";
import { RepositoryPull } from "Pulls/RepositoryPull";
import type { IUserContributions } from "QuickStats";
import { QuickStats } from "QuickStats";
import { StdOutParser } from "Stdout";
import type { Options } from "./types";

export class RepositoryStatsPull extends RepositoryPull<Options> {
  totalLines: number = 0;
  totalCommits: number = 0;
  userStats: IUserContributions[] = [];

  public async pull() {
    Pull.activePull = this;
    this.status = JobStatus.Inprogress;
    try {
      await this.clone();
      await this.getStats();
      this.status = JobStatus.Complete;
    } catch (error) {
      this.status = JobStatus.Failed;
    } finally {
      await super.cleanUp();
    }
    Pull.activePull = null;
    return this;
  }

  private async getStats() {
    const command = new QuickStats(
      RepositoryPull.TARGET_DIRECTORY,
      this.options.date,
    );
    const { userStats, totalCommits } = await command.execute();
    this.userStats = userStats;
    this.totalCommits = totalCommits;
    await this.countLines();
  }

  private async countLines() {
    const { stdout } = await ChildProcess.execute(
      "git ls-files | xargs wc -l | grep ' total'",
      { cwd: RepositoryStatsPull.TARGET_DIRECTORY },
    );
    const lines = stdout.slice(0, -1).split("\n").pop();
    if (lines) {
      this.totalLines = StdOutParser.traceDigit(lines);
    }
  }

  public async pushResultsToCore() {
    const { repositoryId, organizationId } = this.options;
    try {
      await CoreServiceRequest<
        SetRepositoryStatsMutation,
        SetRepositoryStatsMutationVariables
      >({
        query: setRepositoryStats,
        variables: {
          repositoryId,
          organizationId,
          lines: this.totalLines,
          date: this.options.date,
          userStats: this.userStats,
          commits: this.totalCommits,
        },
      });
    } catch (error) {
      this.status = JobStatus.Failed;
    }
  }

  public override async setJobStatus(
    id = this.options.id,
    status = this.status,
  ) {
    try {
      await AsyncServiceRequest<
        SetRepositoryStatsJobStatusMutation,
        SetRepositoryStatsJobStatusMutationVariables
      >({
        query: setRepositoryStatsJobStatus,
        variables: { id, status },
      });
    } catch (error) {
      console.log("error", error);
      // Silence
    }
  }
}
