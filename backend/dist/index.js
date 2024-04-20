"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { PrismaClient } from '@prisma/client'
const router_1 = __importDefault(require("./auth/router"));
const app = (0, express_1.default)();
// const prisma = new PrismaClient()
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send('hello');
    console.log("hello");
});
app.use("/user", router_1.default);
app.listen(3000, () => {
    console.log("Server on 3000");
});
