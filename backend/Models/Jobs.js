const courseSchenma = new mongoose.Schema({
    title: String ,
    salary : Number , 
    domain: { type : Array , "default" : ["default"] },
    requirements : { type : Array , "default" : ["default"] },
    courses_id : [
      { type: mongoose.Schema.Types.ObjectId,
        ref: "course"
      }],
    country : String ,
    duration : String ,
    entreprise : String,
    user_id:[
        { type: mongoose.Schema.Types.ObjectId,
          ref: "porteuseDonneJobsUser"
        }],

})

const job = mongoose.model('job',courseSchenma)

exports.Job = job;