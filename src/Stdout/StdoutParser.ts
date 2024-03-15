export class StdOutParser {
  public static EMAIL_REGEX = /<(.*?)>/g;

  public static traceDigit(str: string) {
    let digit = "";
    const { length } = str;
    for (let i = 0; i < length; i++) {
      const current = str[i];
      if (this.isDigit(current)) {
        digit += current;
      } else if (digit.length) {
        break;
      }
    }
    if (!digit) {
      return 0;
    }
    return parseInt(digit);
  }

  public static isDigit(str: string) {
    // @ts-ignore
    return parseInt(str) == str;
  }
}
