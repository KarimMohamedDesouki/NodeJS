const bodyParser = require('body-parser');
const express = require('express');
const fs = require("fs");
const app = express();
const port = 7000;

console.log(__dirname);

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());



app.get('/main.html',(req,res)=>{
console.log(__dirname+"/main.html");
res.sendFile(__dirname +"/main.html");
});


app.get('/users.html',(req,res)=>{
    console.log(__dirname+"/users.html");
    res.sendFile(__dirname +"/users.html");
    });

app.post('/users.html',(req,res)=>{

    console.log(__dirname+"/users.html");
    // console.log(req.body);
    var body = req.body;
    // console.log(body);
    var name = body.name;
    var number = body.number;
    var email = body.email;
    var address = body.address;
    console.log(name);
    console.log(number);
    console.log(email);
    console.log(address);
    var USERHTML= fs.readFileSync('./users.html','utf-8')
    let value1 = USERHTML.replace("{Name}",name).replace("{Number}",number).replace("{email}",email).replace("{address}",address);
    res.write(value1);
      res.end();
});

app.all('*',(req,res)=>{
    res.redirect('/main.html')
});


app.listen(port,()=>{console.log(`http://localhost:${port}`);})