// example : Create subscription => middleware (check for renewal date) => middleware (check for errors) => next => controller (create subcription) => response.status(201).json({ message: "Subscription created successfully" })
export const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    console.log(err.stack.red);

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = `Resource not found with id of ${err.value}`;
      error = new Error(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message, 400);
    }

    // Mongoose validation error
    const message = Object.values(err.errors).map((val) => val.message);
    if (err.name === "ValidationError") {
      error = new Error(message, 400);
    }

    // Send error response
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });

    // End TRY BLOCK
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
