const express = require("express");
const { createOrder, getOrdersByEmail } = require("./order.controller"); // make sure name matches controller
const router = express.Router();

// POST /api/orders
router.post("/", createOrder);
router.get("/email/:email", getOrdersByEmail); // New route to get orders by email
module.exports = router;
