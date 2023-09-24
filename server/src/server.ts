import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import * as dotenv from "dotenv";
dotenv.config({ path: process.cwd() + "/../.env" });

const app = express();
const port = 3000;

console.log("BASE_URL", process.env.BASE_URL);

app.use("/twirp", createProxyMiddleware({ target: process.env.BASE_URL, changeOrigin: true }));
app.use("/", express.static("../ui/build"));

/*app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});*/

// BASE_URL

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
