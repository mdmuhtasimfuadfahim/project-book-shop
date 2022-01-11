const User = require('../../models/user')
const bcrypt = require('bcrypt')
const moment = require('moment')
const passport = require('passport')
const multer = require('multer')
const path = require('path')

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
}).single('image')

function authController(){
    const _getRedirectUrl = (req) =>{
        return req.user.role === 'Admin' ? '/admin/dashboard' : '/customer/orders'
    }
    return{
        login(req, res){
            res.render('auth/login')
        },
        registration(req, res){
            return res.render('auth/registration')
        },
        postLogin(req, res, next){
            const { email, password } = req.body

            /*------------validate user----------*/
            if(!email || !password){
                req.flash('error', 'All fields are required to be filled up for login')
                return res.redirect('/login')
            } 
            else{
                passport.authenticate('local', (err, user, info) =>{
                    if(err){
                        req.flash('error', info.message)
                        return next(err)
                    }
                    if(!user){
                        req.flash('error', info.message)
                        return res.redirect('/login')
                    }
                    req.login(user, (err) =>{
                        if(err){
                            req.flash('error', info.message)
                            return next(err)
                        }

                        /*--------login with the redirected user role api-------*/ 
                        return res.redirect(_getRedirectUrl(req))
                    })
                })(req, res, next)
            }
        },
        postRegistration(req, res){
            upload(req, res, async function (err) {
            const { name, email, fav_writter, address, contact, dob, password } = req.body
            
            if(err){
                return res.status(500).send({ error: err.message})
            }

            if(!req.file){
                req.flash('error', 'Did not find any file')
            }
            
            /*---------validate request--------*/ 
            if(!name || !email || !fav_writter || !contact ||!address || !password || !dob ){
                req.flash('error', 'All fields are required for registration')
                req.flash('name', name)
                req.flash('email', email)
                req.flash('fav_writter', fav_writter)
                req.flash('dob', dob)
                req.flash('contact', contact)
                req.flash('address', address)
                req.flash('password', password)
                return res.redirect('/registration')
            }

            /*----------check if email exists-----------*/
            User.exists({email: email}, (err, result)=>{
                if(result){
                    req.flash('error', 'This email is taken')
                    req.flash('name', name)
                    req.flash('fav_writter', fav_writter)
                    req.flash('contact', contact)
                    req.flash('address', address)
                    req.flash('dob', dob)
                    req.flash('password', password)
                    return res.redirect('/registration')
                }
            })

            /*----------check if contact number exists-----------*/
            User.exists({contact: contact}, (err, result)=>{
                if(result){
                    req.flash('error', 'This contact is already exists')
                    req.flash('name', name)
                    req.flash('email', email)
                    req.flash('fav_writter', fav_writter)
                    req.flash('address', address)
                    req.flash('dob', dob)
                    req.flash('password', password)
                    return res.redirect('/registration')
                }
            })

            /*---------hash password----------*/
            const hashedPassword = await bcrypt.hash(password, 10)

            /*---------store user information into database--------*/
            const user = new User({
                image: '/img/' + req.file.filename,
                name: name,
                email: email,
                fav_writter: fav_writter,
                contact: contact,
                address: address,
                dob: dob,
                password: hashedPassword
            }) 

            console.log(user)

            user.save().then(request =>{
                req.flash('success', 'Registation done successfully')
                return res.redirect('/')
            }).catch(err =>{
                console.log(err)
                req.flash('error', 'Something went wrong')
                return res.redirect('/registration')
            })
        }) 
        },
        logout(req, res){
            req.logout()
            return res.redirect('/login')
        }
    }
}


module.exports = authController