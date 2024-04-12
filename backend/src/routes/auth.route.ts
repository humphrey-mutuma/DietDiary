import { ExpressAuth } from "@auth/express";
import express from "express";
 import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// If app is served through a proxy
// trust the proxy to allow HTTPS protocol to be detected
app.use("trust proxy");
app.use("/auth/*", ExpressAuth({ providers: [] }));


 
app.set("trust proxy", true);
app.use(
  "/auth/*",
  ExpressAuth({
    providers: [],
    adapter: PrismaAdapter(prisma),
  })
);