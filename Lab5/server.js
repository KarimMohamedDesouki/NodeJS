//#region require
const express = require("express");
const app = express();
const port = 7000;
const bodyparser = require("body-parser");
const UsersRoutes = require("./Routes/UsersRoutes");
const OrderRoutes = require("./Routes/OrderRoutes");
const ItemRoutes = require("./Routes/ItemRoutes");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Application")


//#region middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//#endregion



//#region requests

app.use("/api/users", UsersRoutes);
app.use("/api/Orders", OrderRoutes);
app.use("/api/items", ItemRoutes);
//#endregion



app.listen(port, (req, res) => {
    console.log("http://localhost:" + port);
})