import { Stack } from "Generics/Stack";
import { StdOutParser } from "Stdout";
import type { IUserContributions, UserStatKey, UserStats } from "./types";

export class Parser {
  public totalCommits = 0;
  private collectingUser = false;
  private collectingTotal = false;
  private static EMAIL_REGEX = /<(.*?)>/g;
  readonly userStats = new Stack<IUserContributions>();
  public static readonly userKeys = new Map<UserStatKey, UserStats>();
  constructor(stdout: string[]) {
    this.parse(stdout);
  }

  static {
    this.userKeys.set("commits", "commits");
    this.userKeys.set("lines changed", "lines");
  }

  private parse(stats: string[]) {
    for (const line of stats) {
      const current = line.trim();
      if (
        !current ||
        this.lookForEmailEntry(current) ||
        this.lookForUserStatistic(current) ||
        this.lookForTotalIndicator(current)
      ) {
        continue;
      }
      if (this.lookForTotalCommits(current)) {
        return;
      }
    }
  }

  private lookForEmailEntry(line: string) {
    if (this.collectingTotal || this.collectingUser) {
      return false;
    }
    const email = line.match(Parser.EMAIL_REGEX);
    if (email && email.length === 1) {
      this.userStats.push({
        email: email[0].slice(1, -1),
      } as unknown as IUserContributions);
      this.collectingUser = true;
      return true;
    }
    return false;
  }

  private lookForUserStatistic(line: string) {
    if (!this.collectingUser) {
      return false;
    }
    for (const [indicator, key] of Parser.userKeys) {
      if (line.startsWith(indicator)) {
        const stats = this.userStats.peek();
        stats[key] = StdOutParser.traceDigit(line);
        if ("commits" in stats && "lines" in stats) {
          this.collectingUser = false;
        }
        return true;
      }
    }
    return true;
  }

  private lookForTotalIndicator(line: string) {
    if (line.startsWith("total:")) {
      this.collectingTotal = true;
      return true;
    }
    return false;
  }

  private lookForTotalCommits(line: string) {
    if (!this.collectingTotal || !line.startsWith("commits")) {
      return false;
    }
    this.totalCommits = StdOutParser.traceDigit(line);
    this.collectingTotal = false;
    return;
  }
}
