const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect("mongodb://127.0.0.1:27017/Auth-Practice")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("Error in connecting database",err);
    });
}

module.exports = connectDB;