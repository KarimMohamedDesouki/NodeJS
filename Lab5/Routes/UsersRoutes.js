const express = require("express");
const router = new express.Router();
const UserController = require("../Controllers/UsersController");




// get all students
router.post("/signup",UserController.Register)

// get student by id
router.post("/signin",UserController.Login)




module.exports = router;