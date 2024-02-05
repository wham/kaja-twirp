import { Log, LogLevel } from "../shared/api";

class Bootstrapper {
  logs: Log[];

  constructor() {
    this.logs = [];
  }

  async bootstrap() {

  }

  private log(message: string, level: LogLevel) {
    this.logs.push({ message, index: this.logs.length, level });
  }
}