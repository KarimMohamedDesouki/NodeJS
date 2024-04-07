const express = require("express");
const router = new express.Router();
const OrderController = require("../Controllers/OrderController");


// get all orders
router.get("/", OrderController.GetAllOrder)

// get order by id
router.get("/:id", OrderController.GetOrderById )

// add new order
router.post("/", OrderController.AddOrder)

// update order by id
router.put("/:id", OrderController.UpdateOrder )

// delete course by id
router.delete("/:id", OrderController.DeleteOrder )


module.exports = router;