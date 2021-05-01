const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/PI')
.then( ()=>{console.log('Created collection in MongoDB...')} )
.catch( (er)=> console.log(er) )

const courseSchenma = new mongoose.Schema({
    title: String ,
    author : String ,
    description : String , 
    date: { type : Date , "default" : Date.now },
    domain: [{ type : String , enum : ['web' , 'cloud','finance'] , required:[true, 'at least one domain sir , cmon'] }],
    requirements : { type : Array , "default" : ["default"] },
    price : String ,
    rating : {
      type: Number,
      min: 0,
      max: [5, 'nope less or nothing']
    },
    language : String,
    user_id: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        }],
    jobs_id: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "job"
            }],
    duration : String //
})

const course = mongoose.model('course',courseSchenma)

exports.Course = course;