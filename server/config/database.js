const mongoose = require("mongoose");

async function connectDB() {
    const conn = await mongoose.connect("mongodb+srv://salahiddin:sr2797181@cluster0.ga0rrba.mongodb.net/test");

    console.log(`Connected to MongoDB ${conn.connection.host}`)
}

module.exports = { connectDB }