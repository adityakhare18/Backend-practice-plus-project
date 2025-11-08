const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('./model/user.model');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/create', async (req, res) => {
    const { name, email, password, age } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({
            name,
            email,
            password: hashedPassword,
            age
        });
        const token = jwt.sign({ email }, "secret");
        res.cookie("token", token);
        res.redirect('/all-user');

    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).send("Internal server error");
    }
});

app.get('/all-user', async (req, res) => {
  try {
    const users = await userModel.find();
    res.render('all-user', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.get('/login',(req,res)=>{
    res.render('login')
})


app.post('/login',async (req,res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).send("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).send("Invalid password");
    }
    const token = jwt.sign({ email }, "secret");
    res.cookie("token", token);
    res.redirect('/all-user');
})


app.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.redirect('/');
})
app.listen(3000, () => {
  connectDB();
  console.log('Server is running on port 3000');
});