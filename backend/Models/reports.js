const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/PI')
.then( ()=>{console.log('connected to MongoDB...')} )
.catch( (er)=> console.log(er) )

const courseSchenma = new mongoose.Schema({
    id : Number ,
    name: String, 
    content : String ,
    state : {
        type: String,
        enum : ['Not_fixed','fixed','Pending'],
        default: 'Not_fixed'
    },
    send_date : { type : Date , "default" : Date.now },
    sender:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        },
    img : String
})  

const report = mongoose.model('report',courseSchenma)

exports.Report = report;