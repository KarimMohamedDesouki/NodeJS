
const { log } = require('console');
const http = require('http');
const { url } = require('inspector');

http
    .createServer((req, res) => {
        const fs = require('fs');
        if (req.url != '/favicon.ico') {
            console.log(req.url);
            var url = req.url;
            var splittedurl = url.split('/');
            console.log(splittedurl[1]);//add              
            console.log(splittedurl[2]);//first              
            console.log(splittedurl[3]);//second   
            let validNumbers;
            switch (splittedurl[1]) {
                case "add":
                    let sum = 0;
                    validNumbers = true;
                    for (let i = 2; i < splittedurl.length; i++) {
                        if (!isNaN(parseInt(splittedurl[i]))) {
                            sum += parseInt(splittedurl[i]);
                        } else {
                            validNumbers = false;
                            break;
                        }
                    }

                    if (validNumbers) {
                        res.write("<h1>Result of Addition: " + sum + "</h1>");
                        fs.appendFileSync('data.txt', sum + '\n', 'utf8');
                    } else {
                        res.write("<h1>Error: Invalid parameters for addition.</h1>");
                    }
                    break;
                case "minus":
                    let difference = 0;
                    validNumbers = true;
                    for (let i = 2; i < splittedurl.length; i++) {
                        if (!isNaN(parseInt(splittedurl[i]))) {
                            if (i === 2) {
                                difference = parseInt(splittedurl[i]);
                            } else {
                                difference -= parseInt(splittedurl[i]);
                            }
                        } else {
                            validNumbers = false;
                            break;
                        }
                    }

                    if (validNumbers) {
                        res.write("<h1>Result of Subtraction: " + difference + "</h1>");
                        fs.appendFileSync('data.txt', difference + '\n', 'utf8');
                    } else {
                        res.write("<h1>Error: Invalid parameters for subtraction.</h1>");
                    }
                    break;
                case "mult":
                    let product = 1;
                    validNumbers = true; // Initialize validNumbers here
                    for (let i = 2; i < splittedurl.length; i++) {
                        if (!isNaN(parseInt(splittedurl[i]))) {
                            product *= parseInt(splittedurl[i]);
                        } else {
                            validNumbers = false;
                            break;
                        }
                    }

                    if (validNumbers) {
                        res.write("<h1>Result of Multiplication: " + product + "</h1>");
                        fs.appendFileSync('data.txt', product + '\n', 'utf8');
                    } else {
                        res.write("<h1>Error: Invalid parameters for multiplication.</h1>");
                    }
                    break;
                case "div":
                    let quotient = 1;
                    validNumbers = true; // Initialize validNumbers here
                    for (let i = 2; i < splittedurl.length; i++) {
                        if (!isNaN(parseInt(splittedurl[i])) && parseInt(splittedurl[i]) !== 0) {
                            if (i === 2) {
                                quotient = parseInt(splittedurl[i]);
                            } else {
                                quotient /= parseInt(splittedurl[i]);
                            }
                        } else {
                            validNumbers = false;
                            break;
                        }
                    }

                    if (validNumbers) {
                        res.write("<h1>Result of Division: " + quotient + "</h1>");
                        fs.appendFileSync('data.txt', quotient + '\n', 'utf8');
                    } else {
                        res.write("<h1>Error: Invalid parameters for division.</h1>");
                    }
                    break;
                default:
                    res.write("<h1>Path not recognized or supported.</h1>");
                    break;
            }
        }
        res.end();

    })
    .listen(7000)