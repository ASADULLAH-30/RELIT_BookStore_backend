const Order = require("./order.model");

// Controller to create a new order
const createOrder = async (req, res) => {
  try {
    // Create new order from request body
    const newOrder = new Order(req.body);

    // Save order to database
    const savedOrder = await newOrder.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: "✅ Order created successfully",
      data: savedOrder,
    });
  } catch (error) {
    console.error("❌ Error creating order:", error.message);





    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }

    // Handle all other errors
    res.status(500).json({
      success: false,
      message: "Failed to create an order",
      error: error.message,
    });
  }
};
const getOrdersByEmail = async (req, res) => {

  try {
    const { email } = req.params;
    const orders = await Order.find({email}).sort({createdAt:-1});
    if (!orders) {
      return res.status(404).json({ message: "No orders found for this email" });
    }
    res.status(200).json(orders);
    
  } catch (error) {
    console.error("❌ Error fetching orders by email:", error.message);
    res.status(500).json({ message: "Failed to fetch orders" });
    
  }
}

module.exports = { 
  createOrder,
  getOrdersByEmail 

 };
