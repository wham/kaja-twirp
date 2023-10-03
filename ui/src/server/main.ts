import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import ViteExpress from "vite-express";
import * as dotenv from "dotenv";
dotenv.config({ path: process.cwd() + "/../.env" });

const app = express();

app.use("/twirp", createProxyMiddleware({ target: process.env.BASE_URL, changeOrigin: true }));

ViteExpress.listen(app, 3000, () => console.log("Server is listening on port 3000..."));
