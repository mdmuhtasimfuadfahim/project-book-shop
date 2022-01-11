const Books = require('../../models/book')

function homeController(){
    return{
        async index(req, res){
            const books = await Books.find()
            res.render('home', {books: books})
        }
    }
}


module.exports = homeController