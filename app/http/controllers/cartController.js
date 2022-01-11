

function cartController(){
    return{
        updateCart(req, res){
            if(!req.session.cart){
                req.session.cart = {
                    books: {},
                    totalBooks: 0,
                    totalPrice: 0
                }

                let cart = req.session.cart

                if(!cart.books[req.body._id]){
                    cart.books[req.body._id]={
                        books: req.body,
                        bookqty: 1
                    }

                    cart.totalBooks = cart.totalBooks + 1
                    cart.totalPrice = cart.totalPrice + req.body.price
                }else{
                    cart.books[req.body._id].bookqty = cart.books[req.body._id].bookqty + 1
                    cart.totalBooks = cart.totalBooks + 1
                    cart.totalPrice = cart.totalPrice + req.body.price
                }
                return res.json({totalBooks: req.session.cart.totalBooks})
            }
        }
    }
}


module.exports = cartController