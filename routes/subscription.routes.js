import { Router } from "express";
const subscriptionRouter = Router();

subscriptionRouter.get("", (req, res) => {
  res.send({
    title: "GET all subscriptions route.",
  });
});
subscriptionRouter.get("/:id", (req, res) => {
  res.send({
    title: "GET subscription by ID route.",
  });
});
subscriptionRouter.post("", (req, res) => {
  res.send({
    title: "POST create subscription route.",
  });
});
subscriptionRouter.put("/:id", (req, res) => {
  res.send({
    title: "PUT update subscription route.",
  });
});
subscriptionRouter.delete("/:id", (req, res) => {
  res.send({
    title: "DELETE subscription route.",
  });

  // GET all subscriptions for a user
  subscriptionRouter.get("/user/:id/subscriptions", (req, res) => {
    res.send({
      title: "GET all subscriptions for a user route.",
    });
  });
  subscriptionRouter.put("/:id/cancel", (req, res) => {
    res.send({
      title: "PUT cancel subscription route.",
    });
  });
  subscriptionRouter.get("upcoming-renewals", (req, res) => {
    res.send({
      title: "GET upcoming renewals route.",
    });
  });
});

export default subscriptionRouter;
