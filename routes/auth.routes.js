import { Router } from "express";

// Controllers
import { signUp, signIn, signOut } from "../controllers/auth.controller.js";

const authRouter = Router();

// AUTH ROUTES

// Path GET /api/v1/auth/sign-up
authRouter.get("/sign-up", (req, res) => res.status(200).send("Sign Up Page"));
// Path: POST /api/v1/auth/sign-up
authRouter.post("/sign-up", signUp);

// Path GET /api/v1/auth/sign-in
authRouter.get("/sign-in", (req, res) => res.status(200).send("Sign In Page"));
// Path: POST /api/v1/auth/sign-in
authRouter.post("/sign-in", signIn);

// Path GET /api/v1/auth/sign-out
authRouter.get("/sign-out", (req, res) => res.status(200).send("Sign Out Page"));
// Path: POST /api/v1/auth/sign-out
authRouter.post("/sign-out", signOut);

export default authRouter;
