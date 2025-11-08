const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/data-association")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
}

module.exports = connectDB;