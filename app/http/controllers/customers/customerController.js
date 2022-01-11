const Orders = require('../../../models/order')
const moment = require('moment')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)


function customerController(){
    return{
        async ordersPage(req, res){
            const orders = await Orders.find({ customerId: req.user._id }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password')
            console.log(orders)

            res.header('Cache-Control', 'no-store')
            res.render('customerview/orders', {orders: orders, moment: moment})
        },
        orderedBooks(req, res){
            const{ contact, address, stripeToken, paymentType } = req.body

            /*-----------validate request---------*/
            if(!contact || !address){
                return res.status(422).json({ message: 'All fields are required'})
            }

            /*-----------store orders into database---------*/ 
            const order  = new Orders({
                customerId: req.user._id,
                books: req.session.cart.books,
                contact,
                address
            })

            console.log(order)

            order.save().then(result =>{
                Orders.populate(result, {path: 'customerId'}, async (err, placedOrder) =>{
                    // req.flash('success', 'Order Placed Successfully')

                    /*---------stripe payment--------*/
                    if(paymentType === 'card'){
                        stripe.charges.create({
                            amount: req.session.cart.totalPrice * 100,
                            source: stripeToken,
                            currency: 'inr',
                            description: `Book order: ${placedOrder._id}`
                        }).then(()=>{
                            placedOrder.paymentStatus = true
                            placedOrder.paymentType = paymentType
                            placedOrder.save().then((ord)=>{
                                console.log(ord)
                                /*--------emit events-------*/
                                const eventEmitter = req.app.get('eventEmitter')
                                eventEmitter.emit('orderPlaced', ord)
                                delete req.session.cart
                                return res.json({ message: 'Payment done and order placed successfully'});
                            }).catch(err =>{
                                console.log(err)
                            })
                        }).catch(err =>{
                            delete req.session.cart
                            return res.json({ message: 'Payment failed, You can pay at delivery time'});
                        })
                    } else{
                        console.log(placedOrder)
                        /*--------emit events-------*/
                        const eventEmitter = req.app.get('eventEmitter')
                        eventEmitter.emit('orderPlaced', placedOrder)
                        delete req.session.cart
                        return res.json({ message: 'Order placed successfully'});
                    }
                })
            }).catch(err =>{
                return res.status(500).json({ message: 'Something went wrong'});
            })
        }
    }
}


module.exports = customerController