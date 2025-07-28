const express = require("express");
const Order = require("../model/Order");

const router = express.Router();

router.post("/createorder", async (req, res) => {
  try {
    const { orders, customerId } = req.body;
    console.log("📦 Incoming orders:", JSON.stringify(orders, null, 2));

    if (!orders || orders.length === 0) {
      return res.status(400).json({ error: "No orders provided" });
    }

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

// GET /orders - fetch all orders with relevant details
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customerId", "name email") // assuming customer has name and email fields
      .populate("sellerId", "name") // assuming seller has name field
      .populate("items.id", "itemname") // populate item names in items array
      .exec();
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// POST /orders/:id/confirm - confirm an order
router.post("/orders/:id/confirm", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    order.status = "confirmed";
    await order.save();
    res.json({ success: true, message: "Order confirmed" });
  } catch (err) {
    console.error("Error confirming order:", err);
    res.status(500).json({ error: "Failed to confirm order" });
  }
});

// POST /orders/:id/reject - reject an order
router.post("/orders/:id/reject", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    order.status = "rejected";
    await order.save();
    res.json({ success: true, message: "Order rejected" });
  } catch (err) {
    console.error("Error rejecting order:", err);
    res.status(500).json({ error: "Failed to reject order" });
  }
});

router.delete("/orders/deleteByStatus", async (req, res) => {
  try {
    const { status } = req.query;
    if (!status) {
      return res.status(400).json({ error: "Status query parameter is required" });
    }
    const result = await Order.deleteMany({ status: status });
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (err) {
    console.error("Error deleting orders by status:", err);
    res.status(500).json({ error: "Failed to delete orders" });
  }
});

module.exports = router;
