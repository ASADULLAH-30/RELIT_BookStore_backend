// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load variables from .env file

const app = express();

// Environment variables
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URL; // Make sure this matches your .env

// Middleware
app.use(express.json()); // Allows JSON body parsing
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Frontend origin (Vite dev server)
    credentials: true,              // Allow cookies / auth headers
  })
);

// Routes
const bookRoutes = require("./src/books/book.routes");
const orderRoutes = require("./src/orders/order.routes");
const userRoutes = require("./src/user/user.route");

// Mount routes with prefixes
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);

// Start server function
async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");

    // Test route
    app.get("/", (req, res) => {
      res.send("🚀 Server is running, Hello World!");
    });

    // Start server only after DB connection
    app.listen(port, () => {
      console.log(`🚀 Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit app if DB fails
  }
}

// Run server
startServer();
