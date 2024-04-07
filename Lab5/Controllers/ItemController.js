const ItemValid = require("../Utlies/ItemValidations");
const ItemModel = require("../Models/ItemModel");


let GetAllItem = async (req, res) => {
    // get all data from the DB
    AllItems = await ItemModel.find();
    if (AllItems) {
        return res.json(AllItems);
    }
    return (res.status(200).json({ message: "error in loading the Items" }));

}

// function get order by id
let GetItemById = async (req, res) => {
    // get id by params
    let ItemId = req.params.id;
    // findone the particularid in the DB
    let founditem = await ItemModel.findOne({ id: ItemId })
    if (!founditem) {//if not found in DB
        return res.send("invalid Item id");
    }
    //res
    return (res.json({ message: `Item ${ItemId} Founded`, data: founditem }))
}



// function to add order
let AddItem = async (req, res) => {
    let newItem = req.body;
    if (ItemValid(newItem)) {
        // will get req.body and add instance
        let NewItem = new ItemModel(req.body);
        // save to database
        await NewItem.save()
        //res
        AllItems = await ItemModel.find();

        return (res.json({ message: "new Item created", data: AllItems }))
    }
    return res.send(ItemValid.errors[0].instancePath.split("/")[1] + " : " + ItemValid.errors[0].keyword + " ==> " + ItemValid.errors[0].message);


}


// update order
let UpdateItem = async (req, res) => {
    if (ItemValid(req.body)) {
        // get param of order req.body.id
        let ItemId = req.params.id;
        // check for it in the db if found change the data 
        let found = await ItemModel.findOne({ id: ItemId })
        if (!found) {
            return res.send(`Item ${ItemId} not found`)
        }
        //update the new data with the old data
        found.id = req.body.id
        found.name = req.body.name
        found.price = req.body.price
        found.desc = req.body.desc
        //save to database
        let updatedItem = await found.save();
        // res
        AllItems = await ItemModel.find();
        return (res.json({ message: `Item ${ItemId} updated successfully`, data: AllItems }));

    }

    res.send(ItemValid.errors[0].instancePath.split("/")[1] + " : " + ItemValid.errors[0].keyword + " ==> " + ItemValid.errors[0].message);



}


let DeleteItem = async (req, res) => {
    // get the id from the body req.body.id
    let ItemId = req.params.id;
    // check if the id is in the database or not
    let found = await ItemModel.findOne({ id: ItemId })
    // if yes delete it 
    if (found) {
        await ItemModel.deleteOne({ id: ItemId });
        // return res.send(found)
        AllItems = await ItemModel.find();
        return (res.json({message:`Item ${ItemId} deleted Successfully`, data: AllItems}));
    }    // if no invalid message
    return res.send("Invalid Item Id");

}

module.exports = {
    GetAllItem,
    GetItemById,
    AddItem,
    UpdateItem,
    DeleteItem
}
