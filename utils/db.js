require('dotenv').config()
const mongoose = require('mongoose')

const URI = process.env.MONGO_URL

const Connect = async() => {
    try {
        await mongoose.connect(URI)
        console.log("mongoDb connected")
    } catch (error) {
        console.log("Connection failed")
    }
}

module.exports = Connect