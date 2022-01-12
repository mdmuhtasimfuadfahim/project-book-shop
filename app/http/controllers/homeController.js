const Books = require('../../models/book')
const Blogs = require('../../models/blog')
const moment = require('moment')

function homeController(){
    return{
        async index(req, res){
            const books = await Books.find()
            const blogs = await Blogs.find()
            res.render('home', {books: books, blogs: blogs, moment: moment})
        }
    }
}


module.exports = homeController