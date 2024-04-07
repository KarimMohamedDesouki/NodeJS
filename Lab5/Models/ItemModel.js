// npm i mongoose

const mongoose = require("mongoose");


let usersSchema = new mongoose.Schema(
    {
        id:Number,
        name:String,
        price:Number,
        desc:String
      }
)

module.exports = mongoose.model("Items",usersSchema);