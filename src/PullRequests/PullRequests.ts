import { subYears } from "date-fns";
import { ChildProcess } from "@figliolia/child-process";
import { StdOutParser } from "Stdout";
import type { IPullRequest } from "./types";

export class PullRequests {
  cwd: string;
  pullRequests: IPullRequest[] = [];
  currentDate: false | string = false;
  currentAuthor: false | string = false;
  currentDescription: false | string = false;
  public static COMMAND = "git --no-pager log --no-merges";
  constructor(cwd: string) {
    this.cwd = cwd;
  }

  public async execute() {
    const { stdout } = await ChildProcess.execute(
      `${PullRequests.COMMAND} --since="${this.lastYear}"`,
      { cwd: this.cwd },
    );
    return this.parse(stdout.split("\n"));
  }

  private parse(lines: string[]) {
    for (const line of lines) {
      const current = line.trim();
      if (
        this.detectEntry(current) ||
        this.detectAuthor(current) ||
        this.detectDate(current) ||
        this.detectDescription(current)
      ) {
        continue;
      }
    }
    return this.pullRequests;
  }

  private detectEntry(line: string) {
    if (line.startsWith("commit")) {
      this.resetEntry();
      return true;
    }
    return false;
  }

  private detectAuthor(line: string) {
    if (!line.startsWith("Author")) {
      return false;
    }
    const match = line.match(StdOutParser.EMAIL_REGEX);
    if (match && match.length === 1) {
      this.currentAuthor = match[0].slice(1, -1);
    } else {
      this.currentAuthor = "Unknown";
    }
    return true;
  }

  private detectDate(line: string) {
    if (!line.startsWith("Date")) {
      return false;
    }
    this.currentDate = new Date(line.replace("Date:", "").trim()).toISOString();
    return true;
  }

  private detectDescription(line: string) {
    if (
      !this.currentAuthor ||
      !this.currentDate ||
      (!line && !this.currentDescription)
    ) {
      return false;
    }
    if (this.currentDescription === false) {
      this.currentDescription = "";
    }
    if (!line) {
      this.currentDescription += "\n";
    } else {
      this.currentDescription += line;
    }
  }

  private resetEntry() {
    if (this.currentDate && this.currentAuthor && this.currentDescription) {
      if (this.currentDescription.endsWith("\n")) {
        this.currentDescription.slice(0, -2);
      }
      if (this.currentDescription) {
        this.pullRequests.push({
          date: this.currentDate,
          author: this.currentAuthor,
          description: this.currentDescription,
        });
      }
      this.currentDate = false;
      this.currentAuthor = false;
      this.currentDescription = false;
    }
  }

  private get lastYear() {
    const lastYear = subYears(new Date(), 1);
    return lastYear.toISOString();
  }
}
