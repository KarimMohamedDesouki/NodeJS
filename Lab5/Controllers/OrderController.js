const OrderValid = require("../Utlies/OrderValidations");
const OrderModel = require("../Models/OrderModel");


let GetAllOrder = async (req, res) => {
    // get all data from the DB
    AllOrders = await OrderModel.find();
    if (AllOrders) {
        return res.json(AllOrders);
    }
    return (res.status(200).json({ message: "error in loading the Orders" }));

}

// function get order by id
let GetOrderById = async (req, res) => {
    // get id by params
    let OrderId = req.params.id;
    // findone the particularid in the DB
    let foundorder = await OrderModel.findOne({ id: OrderId })
    if (!foundorder) {//if not found in DB
        return res.send("invalid Order id ");
    }
    // res
    return (res.json({ message: `Order ${OrderId} Found`, data: foundorder }))
}



// function to add order
let AddOrder = async (req, res) => {
    let newOrder = req.body;
    if (OrderValid(newOrder)) {
        // will get req.body and add instance
        let NewOrder = new OrderModel(req.body);
        // save to database
        await NewOrder.save()
        // res
        AllOrders = await OrderModel.find();
        return (res.json({ message: "new Order created", data: AllOrders }))
    }
    return res.send(OrderValid.errors[0].instancePath.split("/")[1] + " : " + OrderValid.errors[0].keyword + " ==> " + OrderValid.errors[0].message);
}


// to update order
let UpdateOrder = async (req, res) => {
    if (OrderValid(req.body)) {
        // get param of order req.body.id
        let OrderId = req.params.id;
        // check for it in the db if found change the data 
        let found = await OrderModel.findOne({ id: OrderId })
        if (!found) {
            return res.send(`Order ${OrderId} not found`)
        }
        //update the new data with the old data
        found.id = req.body.id
        found.totalprice = req.body.totalprice
        found.items = req.body.items
        //save to database
        let updatedOrder = await found.save();
        AllOrders = await OrderModel.find();
        return (res.json({ message: `Order ${OrderId} updated successfully`, data: AllOrders }));// res

    }
    res.send(OrderValid.errors[0].instancePath.split("/")[1] + " : " + OrderValid.errors[0].keyword + " ==> " + OrderValid.errors[0].message);


}


let DeleteOrder = async (req, res) => {
    // get the id from the body req.body.id
    let OrderId = req.params.id;
    // check if the id is in the database or not
    let found = await OrderModel.findOne({ id: OrderId })
    // if yes delete it 
    if (found) {
        await OrderModel.deleteOne({ id: OrderId });
        // return res.send(found)
        AllOrders = await OrderModel.find();
        return res.json({message: `Order ${OrderId} deleted Successfully`, data: AllOrders })
    }    // if no invalid message
    
    return res.send("Invalid Order Id");
}

module.exports = {
    GetAllOrder,
    GetOrderById,
    AddOrder,
    UpdateOrder,
    DeleteOrder
}