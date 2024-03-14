export class QuickStack<T, K> extends Map<T, K> {
  public toList() {
    return Array.from(this.values());
  }
}
