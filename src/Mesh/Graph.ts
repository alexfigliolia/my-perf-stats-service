import type { IMesh } from "./types";

export class Graph extends Map<string, Vertex> {
  public addNode(ID: string) {
    const node = this.get(ID) || new Vertex(ID);
    this.set(ID, node);
    return node;
  }

  public addEdge(ID1: string, ID2: string) {
    const vertex1 = this.addNode(ID1);
    const vertex2 = this.addNode(ID2);
    vertex1.addEdge(ID2);
    vertex2.addEdge(ID1);
  }

  public processMesh(IDs: string[]) {
    const { length } = IDs;
    for (let i = 0; i < length; i++) {
      const current = IDs[i];
      for (let j = i + 1; j < length; j++) {
        const next = IDs[j];
        this.addEdge(current, next);
      }
    }
  }

  public toJSON() {
    const json: IMesh = {};
    for (const [ID, map] of this) {
      const current = json[ID] || {};
      for (const [join, count] of map) {
        current[join] = count;
      }
      json[ID] = current;
    }
    return json;
  }
}

export class Vertex extends Map<string, number> {
  ID: string;
  constructor(ID: string) {
    super();
    this.ID = ID;
  }

  public addEdge(ID: string) {
    const current = this.get(ID) || 0;
    this.set(ID, current + 1);
  }
}
