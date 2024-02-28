import "dotenv/config";

export class Environment {
  public static SSL = !!process.env.SSL;
  public static LOCAL = !!process.env.LOCAL;
  public static SERVER_PORT = this.parsePort("SERVER_PORT");
  public static CERTS_PATH = this.accessOrThrow("CERTS_PATH");
  public static AUTH_SECRET = this.accessOrThrow("AUTH_SECRET");
  public static CORE_SERVICE_URL = this.accessOrThrow("CORE_SERVICE_URL");
  public static ASYNC_SERVICE_URL = this.accessOrThrow("ASYNC_SERVICE_URL");

  public static get origins() {
    return [this.ASYNC_SERVICE_URL];
  }

  private static accessOrThrow(key: string) {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Required environment variable "${key}" is not set`);
    }
    return value;
  }

  private static parsePort(key: string) {
    const value = parseInt(this.accessOrThrow(key));
    if (isNaN(value)) {
      throw new Error(
        `Required environment variable "${key}" is not set to a valid port number`,
      );
    }
    return value;
  }
}
