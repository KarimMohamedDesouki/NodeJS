// creating a server
const http = require('http');
const fs = require("fs");
const { type } = require('os');
const { log } = require('util');
var HOMEHTML= fs.readFileSync('main.html', 'utf-8')
var USERHTML= fs.readFileSync('users.html', 'utf-8')
http.createServer((req, res) => {
    if (req.method == "GET") {
        switch (req.url) {
            case "/":
                // res.setHeader("content-type","type/html") error
                res.write(HOMEHTML)
                break;

            default:
                if (req.url.includes("users.html")) {
                    res.setHeader("Content-Type", "text/html");
                    res.write(USERHTML)
                } else {
                    res.write("Invalid method")
                }
                break;
        }
        res.end()
    } else if (req.method == "POST") {
        let Name = "";
        let number = "";
        let email = "";
        let address = "";
        req.on("data",(data)=>{
            var URL = data.toString();
            console.log(URL);
            Name = URL.split("&")[0].split("=")[1];
            number = URL.split("&")[1].split("=")[1];
            email = URL.split("&")[2].split("=")[1];
            address = URL.split("&")[3].split("=")[1];
            // console.log(Name);
            // console.log(number);
            // console.log(email);
            // console.log(address);            
        })
        req.on("end",()=>{
            let value1 = USERHTML.replace("{Name}",Name).replace("{Number}",number).replace("{email}",email).replace("{address}",address);
            res.write(value1)//to write the file with the updated content
            res.end()
        })
    }

    
}).listen(7000, () => { console.log("http://localhost:7000"); });