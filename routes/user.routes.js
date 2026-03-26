import { Router } from "express";

// Import controllers
import { getUsers, getUser } from "../controllers/user.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const userRouter = Router();

// Get ALL
userRouter.get("/", authorize, getUsers);
// Get by ID
userRouter.get("/:id", authorize, getUser);

// Create
userRouter.post("/create-user", (req, res) => {
  res.send({
    title: "POST create user route.",
  });
});
// Update
userRouter.put("/user/:id", (req, res) => {
  res.send({
    title: "PUT update user route.",
  });
});
// Delete
userRouter.delete("/user/:id", (req, res) => {
  res.send({
    title: "DELETE user route.",
  });
});

export default userRouter;
