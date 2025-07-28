const express = require("express");
const Order = require("../model/Order");

const router = express.Router();

router.post("/createorder", async (req, res) => {
  try {
    const { orders, customerId } = req.body;
    console.log("📦 Incoming orders:", JSON.stringify(orders, null, 2));

    if (!orders || orders.length === 0) {
      return res.status(400).json({ error: "No orders provided" });}

    const createdOrders = await Promise.all(
      orders.map(order => {
        const newOrder = new Order({
          customerId,
          sellerId: order.sellerId,
          customerLocation: order.customerLocation,
          items: order.items,
          total: order.total,
        });
        return newOrder.save();
      })
    );

    res.json({ success: true, orders: createdOrders });
  } catch (err) {
    console.error("Error creating orders:", err);
    res.status(500).json({ error: "Failed to create orders" });
  }
});

module.exports = router;