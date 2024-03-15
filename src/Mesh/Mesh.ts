import { ChildProcess } from "@figliolia/child-process";
import { StdOutParser } from "Stdout";
import { Graph } from "./Graph";

export class Mesh {
  cwd: string;
  graph = new Graph();
  static readonly SHORT_LOG = "git --no-pager shortlog -n -e -s -- $f";
  static readonly COMMAND = `for f in ./**/*; do echo 'file =>' $f; ${this.SHORT_LOG}; done`;
  constructor(cwd: string) {
    this.cwd = cwd;
  }

  public async execute() {
    const CP = new ChildProcess(
      "for f in ./**/*; do echo 'file => ' $f; git --no-pager shortlog -n -s -e -- $f; done",
      { cwd: this.cwd, stdio: ["inherit", "pipe"], shell: "/bin/bash" },
    );
    this.createMesh(CP);
    await CP.handler;
    return this.graph.toJSON();
  }

  private createMesh(CP: ChildProcess) {
    CP.process?.stdout?.on("data", chunk => {
      const stdout = chunk.toString() as string;
      const lines = stdout.split("\n");
      const mesh = new Set<string>();
      for (const line of lines) {
        if (line.startsWith("file =>")) {
          return;
        }
        const match = line.match(StdOutParser.EMAIL_REGEX);
        if (!match || match.length !== 1) {
          continue;
        }
        const email = match[0].slice(1, -1);
        mesh.add(email);
      }
      if (mesh.size) {
        this.graph.processMesh(Array.from(mesh));
      }
    });
  }
}
