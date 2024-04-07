const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");

let Register = async (req, res) => { //name , age ,address ,email ,password
    // get the data from req.body.email check
    let founduser = await UserModel.findOne({ email: req.body.email.toLowerCase() });
    if (founduser) { // if user already exist
        return (res.send("user already exits please login"))
    }
    // will encrypt the password by bcrypt
    let salt = await bcrypt.genSalt(10);
    let HashedPassword = await bcrypt.hash(req.body.password, salt)
    req.body.password = HashedPassword;
    // create new instance to save the new user in it
    let newUSer = new UserModel(req.body);
    await newUSer.save();
    // res
    return (res.json({ message: "new user created", data: newUSer }))

}


let Login = async (req, res) => {
    //get the email of the user who is loging in and check if it is in DB.
    let founduser = await UserModel.findOne({ email: req.body.email.toLowerCase() })
    // if email not found send invalid message
    if (!founduser) {
        return res.send("invalid email and password ")
    }
    // if exist compare the password of the coming data with his password in DB 
    let compare = await bcrypt.compare(req.body.password, founduser.password)
    if (!compare)// if correct send login succesfull
        return res.send("invalid email and password");

    return res.send(`you have logged in successFully`);





}


module.exports = { Login, Register }