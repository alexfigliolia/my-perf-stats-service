import bodyParser from "body-parser";
import cors from "cors";
import type { Express } from "express";
import { Environment } from "Environment";

export class Middleware {
  static App: Express;

  public static register(App: Express) {
    this.App = App;
    return this;
  }

  public static build() {
    this.guard();
    this.configureParser();
    this.configureCors();
  }

  private static configureParser() {
    this.App.use(bodyParser.json());
    this.App.use(bodyParser.urlencoded({ extended: true }));
  }

  private static configureCors() {
    this.App.use(
      cors({
        credentials: true,
        optionsSuccessStatus: 200,
        origin: Environment.origins,
      }),
    );
    this.App.set("trust proxy", 1);
  }

  private static guard() {
    if (!this.App) {
      throw new Error(
        "Did you forget to call Middleware.register() with your Express instance",
      );
    }
  }
}
