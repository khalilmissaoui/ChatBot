const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://saghir:saghirmennine922018@cluster0.tpkrk.mongodb.net/PI')
.then( ()=>{console.log('connected to MongoDB...')} )
.catch( (er)=> console.log(er) )

const courseSchenma = new mongoose.Schema({
    progress : Number ,
    start_sub :{ type : Date , "default" : Date.now },
    end_sub : Date , 
    course_id: 
        { required: true,
          type: mongoose.Schema.Types.ObjectId,
          ref: "course"
        },
    user_id:
        { required: true,
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        },


})

const porteuseDonneUserCourses = mongoose.model('porteuseDonneUserCourses',courseSchenma)

exports.PDUserCourses = porteuseDonneUserCourses;