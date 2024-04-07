const express = require("express");
const router = new express.Router();
const ItemController = require("../Controllers/ItemController");


// get all items
router.get("/", ItemController.GetAllItem)

// get item by id
router.get("/:id", ItemController.GetItemById)

// add new item
router.post("/", ItemController.AddItem)

// update item by id
router.put("/:id", ItemController.UpdateItem)

// delete item by id
router.delete("/:id", ItemController.DeleteItem)


module.exports = router;