const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://saghir:saghirmennine922018@cluster0.tpkrk.mongodb.net/PI')
.then( ()=>{console.log('connected quiz to MongoDB...')} )
.catch( (er)=> console.log(er) )

const courseSchenma = new mongoose.Schema({
    title: String ,
    domain: { type : Array , "default" : ["default"] },
    mark : String ,
    user_id: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        }]
})

const quiz = mongoose.model('quiz',courseSchenma)

exports.Quiz = quiz;