const express = require("express");
const router = express.Router();
module.exports = router;
const bcrypt = require('bcrypt');
const {User} = require('../Models/user')
const nodemailer = require('nodemailer');

const Joi = require('joi')
const jwt = require ('jsonwebtoken');


router.post('/xx',(req,res)=>{
    res.send(req.body);
})


router.post('/',async(req,res)=>{

    const value = validate_data(req.body)
  if(value.error){
    return  res.status(400).send(value.error.details[0].message)}

    const user = await User.findOne({email: req.body.email})
    
    if(!user){ return res.status(400).send('email is wrong')}
    //comparing the hashed password
    const result = await bcrypt.compare(req.body.password,user.password)
    if(!result)
    {return res.status(400).send('password is wrong')}
    //generatign a jwt 
    const jwt_token =jwt.sign({ _id:user._id,isAdmin:user.isAdmin},'secret_token')
    // const jwt_token =jwt.sign({ _id:user._id,isAdmin:user.isAdmin},'secret_token')
    console.log(jwt_token);
   const adJWT = {
      jwt :  jwt_token,
      user : user
   }
   res.status(200).send(adJWT)
})


function validate_data(data) {
    const schema = Joi.object({
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(3).required()
    }).unknown();
    return schema.validate(data)
}

router.post('/resetpasswordemail',async (req,res)=>{
    var rand =  Math.round(1 + (Math.random() * (Date.now())));
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(rand.toString(), salt);

    const transporter = nodemailer.createTransport({
        service : "hotmail",
        auth: {
            user:"chatbotPI@outlook.com",
            pass:"PI1234567"
        }
    });
    
    console.log(req.body.email);
    
    const user = await User.findOneAndUpdate({'email' :req.body.email} , {
        $set : {
            password : hashedpassword
         }
    }, {new:true})

    const options = {
        from:"chatbotPI@outlook.com",
        to:req.body.email,
        subject:"verify your password",
        text:`here is a your new password  : "${rand}", save it , remember it and DONT LOSE IT `
    
    }
    
    await transporter.sendMail(options,(err,info)=>{
        if(err){
            console.log('logged');
             console.log(err);
    
        }
        console.log(info);
    })

    console.log(user);
if(!user){

    console.log('user donst exist');
    res.send('user dosnt exist')
    
}
    
    console.log('user exist')
  
    const result = await user.save()
    res.send(result)

})
