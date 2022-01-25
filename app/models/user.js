const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    email: {type: String, required: true},
    fav_writter: {type: String},
    address: {type: String, required: true},
    contact: {type: String, required: true},
    dob: {type: Date, required: true},
    role: {type: String, default: 'Customer'},
    password: {type: String, required: true},
},{timestamps: true})

module.exports = mongoose.model('User', userSchema)