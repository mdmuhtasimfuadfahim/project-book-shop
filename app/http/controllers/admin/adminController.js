const Orders = require('../../../models/order')
const Users = require('../../../models/user')
const moment = require('moment')
const multer = require('multer')
const path = require('path')
const Books = require('../../../models/book')
const Blogs = require('../../../models/blog')

/*----------file uploader operation-----------*/
let storage = multer.diskStorage({
    destination: (req, file, cb) =>cb(null, 'public/img'),
    filename: (req, file, cb) =>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
    }
}) 

let upload = multer({
    storage,
}).single('bookImage')

function adminController(){
    return{
        async dashboard(req, res){
            const orders = await Orders.find()
            const users = await Users.find()
            const books = await Books.find()
            res.render('adminview/home', {books: books, orders: orders, users: users})
        },
        async customerOrders(req, res){
            Orders.find({ status: { $ne: 'confirmed' } }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password').exec((err, orders)=>{
                if(req.xhr){
                    // console.log(orders)
                    return res.json(orders)
                }else{
                    return res.render('adminview/orders')
                }

            })
        },
        async customerCompletedOrders(req, res){
            const orders = await Orders.find({ status: 'confirmed' }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password')
            console.log(orders)
            return res.render('adminview/completedOrders', {orders: orders, moment: moment})
        },
        async viewUsers(req, res){
            const users = await Users.find()
            res.render('adminview/users', {users: users, moment: moment})
        },
        addBookForm(req, res){
            res.render('adminview/addBooksForm')
        },
        addBook(req, res){
            upload(req, res, async function (err) {
                const { bookName, bookImage, authorName, category, description, price} = req.body
                
                if(err){
                    return res.status(500).send({ error: err.message})
                }
    
                if(!req.file){
                    req.flash('error', 'Did not find any file')
                }
                
                /*---------validate request--------*/ 
                if(!bookName || !authorName ||!category || !description || !price){
                    req.flash('error', 'All fields are required to upload books')
                    req.flash('bookName', bookName)
                    req.flash('authorName', authorName)
                    req.flash('category', category)
                    req.flash('description', description)
                    req.flash('price', price)
                    return res.redirect('/admin/add-books-form')
                }
    
                /*----------check if books exists-----------*/
                Books.exists({bookName: bookName}, (err, result)=>{
                    if(result){
                        req.flash('error', 'This book name exits in database')
                        req.flash('bookName', bookName)
                        req.flash('authorName', authorName)
                        req.flash('category', category)
                        req.flash('description', description)
                        req.flash('price', price)
                        return res.redirect('/admin/add-books-form')
                    }
                })

    
                /*---------store book information into database--------*/
                const books = new Books({
                    bookName: bookName,
                    bookImage: req.file.filename,
                    authorName: authorName,
                    category: category,
                    description: description,
                    price: price
                }) 
    
                console.log(books)
    
                books.save().then(request =>{
                    req.flash('success', 'This book has been added successfully')
                    return res.redirect('/admin/add-books-form')
                }).catch(err =>{
                    console.log(err)
                    req.flash('error', 'Something went wrong')
                    return res.redirect('/admin/add-books-form')
                })
            }) 
        },
        addUserPage(req, res){
            res.render('adminview/addUserForm')
        },
        updateStatus(req, res){
            Orders.updateOne({ _id: req.body.orderId}, { status: req.body.status }, (err, data)=>{
                if(err){
                    console.log(err)
                    return res.redirect('/admin/customer-orders')
                }
                return res.redirect('/admin/customer-orders')
            })
        },
        addBlogForm(req, res){
            res.render('adminview/addBlogForm')
        },
        addBlog(req, res){
            upload(req, res, async function (err) {
                const { bookName, bookImage, description, price, date} = req.body
                
                if(err){
                    return res.status(500).send({ error: err.message})
                }
    
                if(!req.file){
                    req.flash('error', 'Did not find any file')
                }
                
                /*---------validate request--------*/ 
                if(!bookName || !description || !price || !date){
                    req.flash('error', 'All fields are required to upload blog')
                    req.flash('bookName', bookName)
                    req.flash('description', description)
                    req.flash('date', date)
                    req.flash('date', date)
                    return res.redirect('/admin/add-blogs-form')
                }
    
                /*----------check if blogs exists-----------*/
                Blogs.exists({bookName: bookName}, (err, result)=>{
                    if(result){
                        req.flash('error', 'This book name exits in database')
                        req.flash('bookName', bookName)
                        req.flash('authorName', authorName)
                        req.flash('category', category)
                        req.flash('description', description)
                        req.flash('price', price)
                        return res.redirect('/admin/add-books-form')
                    }
                })

    
                /*---------store blogs information into database--------*/
                const blogs = new Blogs({
                    bookName: bookName,
                    bookImage: req.file.filename,
                    description: description,
                    price: price,
                    date: date
                }) 
    
                console.log(blogs)
    
                blogs.save().then(request =>{
                    req.flash('success', 'This blog has been added successfully')
                    return res.redirect('/admin/add-blogs-form')
                }).catch(err =>{
                    console.log(err)
                    req.flash('error', 'Something went wrong')
                    return res.redirect('/admin/add-blogs-form')
                })
            }) 
        },
        async viewAllBooks(req, res){
            const books = await Books.find()
            res.render('adminview/viewBooks', {books: books, moment: moment})
        },
        async viewAllBlogs(req, res){
            const blogs = await Blogs.find()
            res.render('adminview/viewBlogs', {blogs: blogs, moment: moment})
        }
    }
}

module.exports = adminController