import { subDays, subMonths, subWeeks, subYears } from "date-fns";
import { ChildProcess } from "@figliolia/child-process";
import { Schedule } from "GQL/AsyncService/Types";
import { Parser } from "./Parser";

export class QuickStats {
  cwd: string;
  date?: string | null;
  range?: Schedule | null;
  private static readonly TIME = "T08:00:00.000Z";
  public static readonly BASE_COMMAND = "git-quick-stats -T";
  constructor(cwd: string, date?: string | null, range?: Schedule | null) {
    this.cwd = cwd;
    this.date = date;
    this.range = range;
  }

  public async execute() {
    const { stdout } = await ChildProcess.execute(this.command, {
      cwd: this.cwd,
    });
    return new Parser(stdout.split("\n"));
  }

  private get command() {
    if (!this.date || !this.range) {
      return QuickStats.BASE_COMMAND;
    }
    return [
      `_GIT_UNTIL=${this.guard()}`,
      `_GIT_SINCE=${this.startDate}`,
      QuickStats.BASE_COMMAND,
    ].join(" ");
  }

  private get startDate() {
    switch (this.range) {
      case Schedule.Once:
      case Schedule.Daily:
        return subDays(new Date(), 1).toISOString();
      case Schedule.Weekly:
        return subWeeks(new Date(), 1).toISOString();
      case Schedule.Monthly:
        return subMonths(new Date(), 1).toISOString();
      case Schedule.Yearly:
        return subYears(new Date(), 1).toISOString();
      default:
        throw new Error("Invalid range for stats pull");
    }
  }

  private guard() {
    if (!this.date) {
      throw new Error("No date specified");
    }
    return this.fixDate(this.date);
  }

  private fixDate(input: string) {
    const [date, time] = input.split("T");
    if (!date || !time) {
      throw new Error("Dates must be provided in ISO format");
    }
    return `${date}${QuickStats.TIME}`;
  }
}
