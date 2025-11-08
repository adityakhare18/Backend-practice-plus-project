const express = require('express');
const app = express();

const upload = require('./uploadMiddleware')

app.set('view engine','ejs');
app.use(express.json());



app.get('/',(req,res)=>{
    res.render("upload");
})


app.post('/upload',upload.single('photo'),(req,res) => {
    console.log(req.file);
    res.send("file uploaded")
})


app.listen(3000);