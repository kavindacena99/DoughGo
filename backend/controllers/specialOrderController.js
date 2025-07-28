const SpecialOrder = require('../model/SpecialOrder');

// Get all special orders
exports.getAllSpecialOrders = async (req, res) => {
  try {
    const orders = await SpecialOrder.find()
      .populate('itemId', 'itemname')
      .populate('driverId', 'drivername vehiclenumber')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching special orders', error });
  }
};

// Accept a special order (for simplicity, just delete it here or you can implement status)
exports.acceptSpecialOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    // Here you can implement logic to move order to accepted collection or update status
    await SpecialOrder.findByIdAndDelete(orderId);
    res.json({ message: 'Special order accepted and removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting special order', error });
  }
};

// Delete a special order
exports.deleteSpecialOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    await SpecialOrder.findByIdAndDelete(orderId);
    res.json({ message: 'Special order deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting special order', error });
  }
};
