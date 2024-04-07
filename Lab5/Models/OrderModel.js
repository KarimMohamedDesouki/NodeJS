// npm i mongoose

const mongoose = require("mongoose");

// const OrderModel = require("../Models/OrderModel")

// class OrderModel{
//   find(){
//       return AllOrders
//   }
//   save(){
//       AllOrders.push(this);
//   }
// }


let usersSchema = new mongoose.Schema(
    {
        id:Number,
        totalprice:Number,
        items:Array,
      }
)

module.exports = mongoose.model("Orders",usersSchema);