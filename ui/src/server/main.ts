import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import ViteExpress from "vite-express";
import * as dotenv from "dotenv";
import { exec } from "child_process";
import path from "path";
import { linker } from "./linker";
dotenv.config({ path: process.cwd() + "/../.env" });

const app = express();

app.use("/twirp", createProxyMiddleware({ target: process.env.BASE_URL, changeOrigin: true }));

app.use("/bootstrap", (req, res) => {
  console.log(process.cwd());
  const protoPath = path.resolve(process.cwd(), "../proto");
  const outPath = path.resolve(process.cwd(), "../ui/src/client/gen");
  console.log("protoPath", protoPath);

  exec(`protoc --ts_out ${outPath} --ts_opt long_type_string -I${protoPath} $(find ${protoPath} -iname "*.proto")`, (error, stdout, stderr) => {
    if (error) {
      res.send(`exec error: ${error}`);
      return;
    }

    linker(outPath);
    exec(`npm run build`, (error, stdout, stderr) => {
      if (error) {
        res.send(`exec error: ${error}`);
        return;
      }

      res.send(`stdout: ${stdout}`);
      //console.error(`stderr: ${stderr}`);
    });
  });
});

ViteExpress.listen(app, 3000, () => console.log("Server is listening on port 3000..."));
