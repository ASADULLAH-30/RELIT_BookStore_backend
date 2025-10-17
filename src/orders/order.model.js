const mongoose = require("mongoose");

// Define order schema
const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: false,
      },
      zipcode: {
        type: String,
        required: false,
      },
    },
    phone: {
      type: Number,
      required: true,
    },
    productids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book", // Refers to your Book model
        required: true,
      },
    ],
    totalPrices: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt automatically
  }
);

// Create and export model
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
