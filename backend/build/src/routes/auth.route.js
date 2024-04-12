"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("@auth/express");
const express_2 = __importDefault(require("express"));
const prisma_adapter_1 = require("@auth/prisma-adapter");
const client_1 = require("@prisma/client");
const app = (0, express_2.default)();
const prisma = new client_1.PrismaClient();
// If app is served through a proxy
// trust the proxy to allow HTTPS protocol to be detected
app.use("trust proxy");
app.use("/auth/*", (0, express_1.ExpressAuth)({ providers: [] }));
app.set("trust proxy", true);
app.use("/auth/*", (0, express_1.ExpressAuth)({
    providers: [],
    adapter: (0, prisma_adapter_1.PrismaAdapter)(prisma),
}));
