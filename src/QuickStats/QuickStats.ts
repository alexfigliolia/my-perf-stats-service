import { ChildProcess } from "@figliolia/child-process";
import { Parser } from "./Parser";

export class QuickStats {
  cwd: string;
  date?: string | null;
  private static readonly TIME = "T08:00:00.000Z";
  public static readonly BASE_COMMAND = "git-quick-stats -T";
  constructor(cwd: string, date?: string | null) {
    this.cwd = cwd;
    this.date = date;
  }

  public async execute() {
    const { stdout } = await ChildProcess.execute(this.command, {
      cwd: this.cwd,
    });
    return new Parser(stdout.split("\n"));
  }

  private get command() {
    if (!this.date) {
      return QuickStats.BASE_COMMAND;
    }
    return [
      `_GIT_UNTIL=${this.guard()}`,
      `_GIT_SINCE=${this.oneMonthAgo}`,
      QuickStats.BASE_COMMAND,
    ].join(" ");
  }

  private get oneMonthAgo() {
    const current = this.guard();
    const baseDate = new Date(current);
    const day = this.zeroth(baseDate.getDate());
    const month = baseDate.getMonth();
    const year = baseDate.getFullYear();
    if (month === 0) {
      return `${year - 1}-${12}-${day}${QuickStats.TIME}`;
    }
    return `${year}-${this.zeroth(month)}-${day}${QuickStats.TIME}`;
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

  private zeroth(n: number) {
    if (n < 10) {
      return `0${n}`;
    }
    return n.toString();
  }
}
