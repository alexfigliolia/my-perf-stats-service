import { QuickStack } from "Generics/QuickStack";
import { StdOutParser } from "Stdout";
import type { IUserContributions, UserStatKey, UserStats } from "./types";

export class Parser {
  public totalCommits = 0;
  private collectingTotal = false;
  private static EMAIL_REGEX = /<(.*?)>/g;
  private activeUser: string | false = false;
  readonly userStats = new QuickStack<string, IUserContributions>();
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
    if (this.collectingTotal || this.activeUser) {
      return false;
    }
    const match = line.match(Parser.EMAIL_REGEX);
    if (match && match.length === 1) {
      const email = match[0].slice(1, -1);
      if (!this.userStats.has(email)) {
        this.userStats.set(email, this.createBaseEntry(email));
      }
      this.activeUser = email;
      return true;
    }
    return false;
  }

  private lookForUserStatistic(line: string) {
    if (!this.activeUser) {
      return false;
    }
    for (const [indicator, key] of Parser.userKeys) {
      if (line.startsWith(indicator)) {
        const entry =
          this.userStats.get(this.activeUser) ||
          this.createBaseEntry(this.activeUser);
        entry[key] += StdOutParser.traceDigit(line);
        if ("commits" in entry && "lines" in entry) {
          this.activeUser = false;
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

  private createBaseEntry(email: string) {
    return { email, lines: 0, commits: 0 };
  }
}
