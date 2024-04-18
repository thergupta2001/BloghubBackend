"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_ts_1 = require("./register.ts");
const userRouter = express_1.default.Router();
userRouter.post("/register", register_ts_1.registerController);
exports.default = userRouter;
