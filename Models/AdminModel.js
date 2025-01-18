const mongoose = require('mongoose')

const adminShema = new mongoose.Schema({
    adminId:{
        type: String,
        ref: "Admin",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
})

const Admin = mongoose.model('Admin', adminShema)

module.exports = Admin