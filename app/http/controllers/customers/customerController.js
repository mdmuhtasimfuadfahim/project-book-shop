const Orders = require('../../../models/order')
const moment = require('moment')

function customerController(){
    return{
        async ordersPage(req, res){
            const orders = await Orders.find()
            console.log(orders)

            res.header('Cache-Control', 'no-store')
            res.render('customerview/orders', {orders: orders, moment: moment})
        }
    }
}


module.exports = customerController