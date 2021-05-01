const express = require("express");
const router = express.Router();
module.exports = router;

router.use(express.json());
const bcrypt = require('bcrypt')
const {User} = require('../Models/user')

const nodemailer = require('nodemailer');
const jwt = require ('jsonwebtoken');

//note : we need to check on credentials here , dont forget to add it !
router.get('/',(req,res)=>{
    res.send('register');
})
// /register
router.post('/saveUser', async(req,res)=>{
   console.log(req.body);
    const user = new User({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
        imgpic:"https://media.istockphoto.com/photos/businesswoman-portrait-on-white-picture-id615279718?k=6&m=615279718&s=612x612&w=0&h=ozD8oKRFXmyyXoAcDuo09WSkmtLSYYlOBuCCNrMyW2Y="
       // isAdmin :req.body.isAdmin,
        ,
        isValid:false
    })
    
    
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    //mailSENDER

    const transporter = nodemailer.createTransport({
        service : "hotmail",
        auth: {
            user:"chatbotPI@outlook.com",
            pass:"PI1234567"
        }
    });
    
    const jwt_token =jwt.sign({email:user.email},'secret_token')

    const options = {
        from:"chatbotPI@outlook.com",
        to:user.email,
        subject:"verify your account",
        text:`click on this link to verify your acocunt http://localhost:3001/register/verify?jwt=${jwt_token}`
    
    }
    
    await transporter.sendMail(options,(err,info)=>{
        if(err){
             console.log(err);
             return
        }
        console.log(info.response);
    })

    try{
    const result = await user.save();
    res.send(result)
    }
    catch(er){
        console.log(er);
    }

})

router.get('/verify',async(req,res)=>{
    const {email} =jwt.verify(req.query.jwt,'secret_token');
    const user =await User.findOneAndUpdate({email:email},{isValid:true})


    res.send("thank you for validating your email sir ")
})
