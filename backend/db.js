const mongoose = require('mongoose');

require('dotenv').config()
const mongoUri = process.env.MONGO_URI

const coonectToMonogo = async () => {
    
    await mongoose.connect(mongoUri)
    console.log("Connected to Mongo Successfully")
}

module.exports = coonectToMonogo;