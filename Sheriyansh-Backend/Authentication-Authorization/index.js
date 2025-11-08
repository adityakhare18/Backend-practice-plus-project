const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");

// $2b$10$QEHTN1V.y.zYYHm5R374P.53ggGRNR1oUoMTeJF9DRihSS1K/S43G
app.use(cookieParser());

// app.get('/',(req,res)=>{
//     res.cookie("name","aditya");
//     res.send("cookie set");
// })

app.get('/',(req,res)=>{
    bcrypt.hash("aditya", 10, (err, hash) => {
        console.log(hash);
    })
    res.send("password hashed");
})


app.get('/compare',(req,res)=>{
    bcrypt.compare("adtya","$2b$10$QEHTN1V.y.zYYHm5R374P.53ggGRNR1oUoMTeJF9DRihSS1K/S43G", (err, result) => {
        console.log(result);
    })
    res.send("password compared");
})
app.get('/read',(req,res)=>{
    res.send("value of cookie is: "+req.cookies.name);
})


app.get('/set-token',(req,res)=>{
    const token = jwt.sign({name : "Aditya"},"secret");
    res.cookie("token",token);
    res.send("token set");
})

app.get("/verify-token",(req,res)=>{
    const data = jwt.verify(req.cookies.token,"secret");
    console.log(data);
    res.send("token verified");
})
app.listen(3000);