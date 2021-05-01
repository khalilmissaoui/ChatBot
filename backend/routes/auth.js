const express = require("express");
const router = express.Router();
module.exports = router;
const bcrypt = require('bcrypt');
const {User} = require('../Models/user')

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
