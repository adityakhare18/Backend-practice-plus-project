const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model')

router.get("/",(req,res)=>{
    res.send("hey owner route");
})

if(process.env.NODE_ENV === "development"){
    router.get("/create",(req,res)=>{
        res.send("Create route")
    })
}



module.exports = router;