const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    bookName: {type: String, required: true},
    bookImage: {type: String, required: true},
    authorName: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String}
}, {timestamps: true})

module.exports = mongoose.model('Books', bookSchema)