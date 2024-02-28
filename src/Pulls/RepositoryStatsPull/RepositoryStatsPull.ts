import { Pull } from "@alexfigliolia/my-performance-async";
import { CoreServiceRequest } from "@alexfigliolia/my-performance-clients";
import { ChildProcess } from "@figliolia/child-process";
import { Stack } from "Generics/Stack";
import { setRepositoryStats } from "GQL";
import { JobStatus } from "GQL/AsyncService/Types";
import type {
  SetRepositoryStatsMutation,
  SetRepositoryStatsMutationVariables,
} from "GQL/CoreService/Types";
import { RepositoryPull } from "Pulls/RepositoryPull";
import type {
  IUserContributions,
  Options,
  UserStatKey,
  UserStats,
} from "./types";

export class RepositoryStatsPull extends RepositoryPull<Options> {
  totalLines: number = 0;
  totalCommits: number = 0;
  private collectingUser = false;
  private collectingTotal = false;
  private static EMAIL_REGEX = /<(.*?)>/g;
  readonly userStats = new Stack<IUserContributions>();
  public static readonly userKeys = new Map<UserStatKey, UserStats>();

  static {
    this.userKeys.set("commits", "commits");
    this.userKeys.set("lines changed", "lines");
  }

  public async pull() {
    Pull.activePull = this;
    this.status = JobStatus.Inprogress;
    try {
      await this.clone();
      const stats = await this.analyze();
      this.parseStats(stats);
      await this.countLines();
      this.status = JobStatus.Complete;
    } catch (error) {
      this.status = JobStatus.Failed;
    } finally {
      await super.cleanUp();
    }
    Pull.activePull = null;
    return this;
  }

  private async analyze() {
    const { stdout } = await ChildProcess.execute("git-quick-stats -T", {
      cwd: RepositoryStatsPull.TARGET_DIRECTORY,
    });
    return stdout.split("\n");
  }

  private parseStats(stats: string[]) {
    for (const line of stats) {
      const current = line.trim();
      if (!current) {
        continue;
      }
      if (!this.collectingTotal && !this.collectingUser) {
        const email = current.match(RepositoryStatsPull.EMAIL_REGEX);
        if (email && email.length === 1) {
          this.userStats.push({
            email: email[0].slice(1, -1),
          } as unknown as IUserContributions);
          this.collectingUser = true;
          continue;
        }
      }
      if (this.collectingUser) {
        for (const [indicator, key] of RepositoryStatsPull.userKeys) {
          if (current.startsWith(indicator)) {
            const stats = this.userStats.peek();
            stats[key] = this.traceDigit(current);
            if ("commits" in stats && "lines" in stats) {
              this.collectingUser = false;
            }
            continue;
          }
        }
        continue;
      }
      if (current.startsWith("total:")) {
        this.collectingTotal = true;
        continue;
      }
      if (this.collectingTotal && current.startsWith("commits")) {
        this.totalCommits = this.traceDigit(current);
        this.collectingTotal = false;
        return;
      }
    }
  }

  private async countLines() {
    const { stdout } = await ChildProcess.execute(
      "git ls-files | xargs wc -l | grep ' total'",
      { cwd: RepositoryStatsPull.TARGET_DIRECTORY },
    );
    const lines = stdout.slice(0, -1).split("\n").pop();
    if (lines) {
      this.totalLines = this.traceDigit(lines);
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
          userStats: this.userStats,
          totalLines: this.totalLines,
          totalCommits: this.totalCommits,
        },
      });
    } catch (error) {
      this.status = JobStatus.Failed;
    }
  }
}
