import express, { Request, Response } from "express";
import signup from "./signup";
import userVerification from "./verify";
import login from "./login";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login)
router.post("/verify", userVerification);

export default router;