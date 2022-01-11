const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const adminController = require('../app/http/controllers/admin/adminController')
const customerController = require('../app/http/controllers/customers/customerController')
const cartController = require('../app/http/controllers/cartController')

/*------------middlewares--------------*/
const auth = require('../app/http/middlewares/auth') 
const guest = require('../app/http/middlewares/guest') 
const admin = require('../app/http/middlewares/admin') 

function initRoutes(app){
    app.get('/', homeController().index)
    app.get('/login', guest, authController().login)
    app.get('/registration', guest, authController().registration)
    app.get('/cart', cartController().viewPage)

    app.post('/post-login', authController().postLogin)
    app.post('/post-registration', authController().postRegistration)
    app.post('/logout', auth, authController().logout)
    

    /*------admin routes-----*/ 
    app.get('/admin/dashboard', admin, adminController().dashboard)
    app.get('/admin/users-view', admin, adminController().viewUsers)
    app.get('/admin/customer-orders', admin, adminController().customerOrders)
    app.get('/admin/add-user-page', adminController().addUserPage)
    app.get('/admin/add-books-form', admin, adminController().addBookForm)
    app.post('/admin/order/status', adminController().updateStatus)
    app.post('/admin/add-books', adminController().addBook)

    /*------admin routes-----*/ 
    app.post('/orders', customerController().orderedBooks)
    app.get('/customer/orders', customerController().ordersPage)
    app.post('/update-cart', cartController().updateCart)
}


module.exports = initRoutes