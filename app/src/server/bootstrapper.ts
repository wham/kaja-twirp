import { exec } from "child_process";
import fs from "fs";
import path from "path";
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
      this.info("Bootstrap started");
      this.start();
    }

    return Promise.resolve({ status: this.status, logs: this.logs.slice(request.logOffset) });
  }

  private async start(): Promise<void> {
    this.debug(process.cwd());
    const protoPath = path.resolve(process.cwd(), "../demo/proto");
    const outPath = path.resolve(process.cwd(), "../app/src/client/protoc");
    this.debug("protoPath: " + protoPath);

    fs.mkdir(outPath, { recursive: true }, (error) => {
      if (error) {
        this.error("Failed to create output directory", error);
      } else {
        this.debug("Output directory created or already exists");
        exec(`protoc --ts_out ${outPath} --ts_opt long_type_bigint -I${protoPath} $(find ${protoPath} -iname "*.proto")`, (error, stdout, stderr) => {
          if (error) {
            this.error("Failed to run protoc", error);
            return;
          }

          exec(`npm run build`, (error, stdout, stderr) => {
            if (error) {
              this.error("Failed to run npm build", error);
              return;
            }

            for (let line in stdout.split("\n")) {
              this.debug(line);
            }
            this.status = BootstrapStatus.STATUS_READY;
          });
        });
      }
    });
  }

  private debug(message: string) {
    this.log(message, LogLevel.LEVEL_DEBUG);
  }

  private info(message: string) {
    this.log(message, LogLevel.LEVEL_INFO);
  }

  private warn(message: string) {
    this.log(message, LogLevel.LEVEL_WARN);
  }

  private error(message: string, error?: Error) {
    this.status = BootstrapStatus.STATUS_ERROR;
    this.log(message, LogLevel.LEVEL_ERROR, error);
  }

  private log(message: string, level: LogLevel, error?: Error) {
    console.log(message, error);
    this.logs.push({ message, index: this.logs.length, level });
  }
}