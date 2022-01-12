const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    bookName: {type: String, required: true},
    bookImage: {type: String, required: true},
    date: {type: Date, required: true},
    price: {type: Number, required: true},
    description: {type: String}
}, {timestamps: true})

module.exports = mongoose.model('Blogs', blogSchema)