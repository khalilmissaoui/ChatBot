const Users = require('../Models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
const {User} = require('../Models/user')

const {google} = require('googleapis')
const {OAuth2} = google.auth
const fetch = require('node-fetch')

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {CLIENT_URL} = process.env

const userCtrl = {
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login now!"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: "Please login now!"})

                const access_token = createAccessToken({id: user.id})
                res.json({access_token})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    forgotPassword: async (req, res) => {
        try {
            console.log('forget password');
            const email = req.body.email
            const user = await User.findOne({email :email})
            console.log(user);
           // if(!user) return res.status(400).json({msg: "This email does not exist."})
            console.log('before acces token');
            const access_token = jwt.sign({ _id:user._id},'secret_token')
            console.log('access_token',access_token);
            const url = `${CLIENT_URL}/login/reset/${access_token}`

            sendMail(email, url, "Reset your password")
            res.json({msg: "To reset the password, please check your email."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    resetPassword: async (req, res) => {
        try {
            const {password} = req.body
            console.log(password)
            const passwordHash = await bcrypt.hash(password, 12)

            await User.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})
        } catch (err) {
            return res.status(400).json({msg: err.message})
        }
    },
    
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/login/refresh_token'})
            return res.json({msg: "Logged out."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
   
   
    googleLogin: async (req, res) => {
        try {
            console.log('inside the liging ');
            const {tokenId} = req.body

            const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID})
            
            const {email_verified, email, name, } = verify.payload

            const password = email + process.env.GOOGLE_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            if(!email_verified) return res.status(400).json({msg: "Email verification failed."})

            const user = await User.findOne({email})

            if(user){
                const isMatch = await bcrypt.compare(password, user.password)
                if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

                // const refresh_token = createRefreshToken({id: user._id})
                // res.cookie('refreshtoken', refresh_token, {
                //     httpOnly: true,
                //     path: '/login/refresh_token',
                //     maxAge: 7*24*60*60*1000 // 7 days
                // })

                res.json({msg: "Login success!"})
            }else{
                console.log('inside the else ');
                const newUser = new User({
                    name : name,email: email, password: passwordHash, 
                })

                await newUser.save()
                
                // const refresh_token = createRefreshToken({id: newUser._id})
                // res.cookie('refreshtoken', refresh_token, {
                //     httpOnly: true,
                //     path: '/login/refresh_token',
                //     maxAge: 7*24*60*60*1000 // 7 days
                // })

                res.json({msg: "Login success!"})
            }


        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: err.message})
        }
    },
}





/*function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}
*/
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)
}

module.exports = userCtrl