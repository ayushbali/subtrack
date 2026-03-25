import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minlength: [3, "Subscription name must be at least 3 characters long"],
      maxlength: [100, "Subscription name must be at most 100 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required for a subscription"],
      min: [0, "Price cannot be negative"],
      validate: {
        validator: (value) => {
          if (typeof value !== "number" || isNaN(value)) return false;
          return true;
        },
      },
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD"],
      default: "EUR",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: ["Entertainment", "Productivity", "Health", "Education", "Other"],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "paused", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => {
          value <= new Date();
        },
        message: "Start date cannot be in the future",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// Auto calculate renewal date if missing
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency],
    );
  }
  // Auto-update status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
