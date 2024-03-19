import { Pull, RepositoryPull } from "@alexfigliolia/my-performance-async";
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
import { Mesh } from "Mesh";
import type { IMesh } from "Mesh/types";
import { PullRequests } from "PullRequests";
import type { IPullRequest } from "PullRequests/types";
import type { IUserContributions } from "QuickStats";
import { QuickStats } from "QuickStats";
import { StdOutParser } from "Stdout";
import type { Options } from "./types";

export class RepositoryStatsPull extends RepositoryPull<Options> {
  mesh: IMesh = {};
  totalLines: number = 0;
  totalCommits: number = 0;
  PRs: IPullRequest[] = [];
  userStats: IUserContributions[] = [];

  public async pull() {
    Pull.activePull = this;
    this.status = JobStatus.Inprogress;
    try {
      await this.clone();
      await this.getStats();
      await this.countLines();
      await this.createMesh();
      await this.getPullRequests();
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
      this.options.range,
    );
    const { userStats, totalCommits } = await command.execute();
    this.userStats = userStats.toList();
    this.totalCommits = totalCommits;
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

  private async createMesh() {
    if (this.options.range) {
      return;
    }
    const mesh = new Mesh(RepositoryPull.TARGET_DIRECTORY);
    this.mesh = await mesh.execute();
  }

  private async getPullRequests() {
    if (!this.options.range) {
      return;
    }
    const PRs = new PullRequests(RepositoryPull.TARGET_DIRECTORY);
    this.PRs = await PRs.execute();
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
          mesh: this.mesh,
          lines: this.totalLines,
          pullRequests: this.PRs,
          range: this.options.range,
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
