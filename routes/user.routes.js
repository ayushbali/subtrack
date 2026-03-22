import { Router } from "express";
const userRouter = Router();

// Get ALL
userRouter.get("/users", (req, res) => {
  res.send({
    title: "GET all users route.",
  });
});
// Get by ID
userRouter.get("/user/:id", (req, res) => {
  res.send({
    title: "GET user by ID route.",
  });
});
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
