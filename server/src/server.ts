import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const port = 3000;

app.use("/twirp", createProxyMiddleware({ target: "http://localhost:41521", changeOrigin: true }));
app.use("/", express.static("../ui/build"));

/*app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});*/

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
