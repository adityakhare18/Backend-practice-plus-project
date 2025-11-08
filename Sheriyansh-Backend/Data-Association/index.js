const express = require('express');
const app = express();

const connectDB = require('./config/db');
const userModel = require('./models/user.model');
const postModel = require('./models/post.model');


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/createUser', async (req, res) => {
    const user = await userModel.create({
        name:"Aditya",
        email:"a.a@gmail.com",
        age:"22"
    })
    res.send(user);
})

app.get('/createPost', async (req, res) => {
    const post = await postModel.create({
        postData:"This is a post",
        user:"68314f5523b45e08624d4c95"
    })

    const user = await userModel.findById({_id:"68314f5523b45e08624d4c95"});
    user.posts.push(post._id);
    await user.save();
    res.send({user,post});
})

app.listen(3000, () => {
    connectDB();
    console.log('Server is running on port 3000');
});