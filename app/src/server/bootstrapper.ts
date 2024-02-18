import { BootstrapRequest, BootstrapResponse, BootstrapStatus, Log, LogLevel } from "../shared/api";

export class Bootstrapper {
  status: BootstrapStatus;
  logs: Log[];

  constructor() {
    this.status = BootstrapStatus.STATUS_READY;
    this.logs = [];
  }

  async bootstrap(request: BootstrapRequest): Promise<BootstrapResponse> {
    if (this.status !== BootstrapStatus.STATUS_RUNNING || request.logOffset === 0) {
      this.status = BootstrapStatus.STATUS_RUNNING;
      this.logs = [];
      this.log("Bootstrap started", LogLevel.LEVEL_INFO);
      this.start();
    }

    return Promise.resolve({ status: this.status, logs: this.logs.slice(request.logOffset) });
  }

  private async start(): Promise<void> {
  }

  private log(message: string, level: LogLevel) {
    this.logs.push({ message, index: this.logs.length, level });
  }
}