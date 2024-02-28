export class Stack<T> extends Array<T> {
  public peek() {
    return this[this.length - 1];
  }
}
