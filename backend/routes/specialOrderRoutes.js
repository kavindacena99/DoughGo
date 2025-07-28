const express = require('express');
const router = express.Router();
const specialOrderController = require('../controllers/specialOrderController');

// GET all special orders
router.get('/', specialOrderController.getAllSpecialOrders);

// POST accept a special order by id
router.post('/accept/:id', specialOrderController.acceptSpecialOrder);

// DELETE a special order by id
router.delete('/:id', specialOrderController.deleteSpecialOrder);

module.exports = router;
