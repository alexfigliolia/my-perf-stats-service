import chalk from "chalk";
import type { ChildProcess as CP } from "child_process";
import process from "process";
import { ChildProcess } from "@figliolia/child-process";

export class Development {
  private static TSX?: CP;

  public static async run() {
    this.log("Booting up...");
    try {
      this.listenForKills();
      const { handler, process: CP } = new ChildProcess(
        "tsx watch --clear-screen=false src/Start.ts",
        {
          stdio: "inherit",
          env: {
            ...process.env,
            NODE_ENV: "development",
            NODE_OPTIONS: "--enable-source-maps",
            NODE_EXTRA_CA_CERTS: "../my-perf-core/cert/server.cert",
          },
        },
      );
      this.TSX = CP;
      return handler;
    } catch (error) {
      this.killServier();
    }
  }

  private static killServier = () => {
    if (this.TSX) {
      this.TSX.kill();
      this.TSX = undefined;
    }
  };

  private static listenForKills() {
    process.on("exit", this.killServier);
    process.on("SIGINT", this.killServier);
    process.on("SIGTERM", this.killServier);
  }

  private static log(...messages: string[]) {
    console.log(chalk.magentaBright.bold("Dev Server:"), ...messages);
  }
}
