import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import { connectDB } from "./database/db.js";
import errorMiddleware from "./middleware/error.middleware.js";

// IMPORT ROUTES
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// USE ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API!");
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/subscriptions", subscriptionRouter);

// ERROR HANDLING MIDDLEWARE
app.use(errorMiddleware);

// START SERVER
app.listen(PORT, async () => {
  console.log(
    `Subscription tracker API is running on http://localhost:${PORT}`,
  );
  await connectDB();
});

export default app;
