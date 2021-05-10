const jwt = require('jsonwebtoken')

exports.auth =function(req,res,next) {
    const token = req.header('x-auth-token')
    if(!token) res.status(401).send('unauthorized, no token provided')
else{
try{
    console.log('******inisde the midllware here is your token : ',token);
    const decoded_payload =jwt.verify(token,'secret_token');
    req.user = decoded_payload ; //we passed the payloaded value in the token inside our req ; req.user
    next();
}
catch(ec){
    res.status(400).send('invalid token')
}}
}