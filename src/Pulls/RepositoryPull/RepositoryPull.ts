import { existsSync } from "fs";
import { join } from "path";
import { Pull } from "@alexfigliolia/my-performance-async";
import { ChildProcess } from "@figliolia/child-process";
import type { Options } from "./types";

export abstract class RepositoryPull<O extends Options> extends Pull<O> {
  public static TARGET_DIRECTORY = join(process.cwd(), "tmp");

  abstract pull(): Promise<Pull<O>>;

  abstract pushResultsToCore(): Promise<void>;

  protected cleanUp() {
    return new ChildProcess("rm -rf tmp").handler;
  }

  protected async clone() {
    if (existsSync(RepositoryPull.TARGET_DIRECTORY)) {
      await this.cleanUp();
    }
    await new ChildProcess(`git clone ${this.options.clone_url} tmp`).handler;
  }
}
