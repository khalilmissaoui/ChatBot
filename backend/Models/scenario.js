const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://saghir:saghirmennine922018@cluster0.tpkrk.mongodb.net/PI')
.then( ()=>{console.log('connected to MongoDB...')} )
.catch( (er)=> console.log(er) )


const courseSchenma = new mongoose.Schema({
    title: String ,
    type: {
        type: String,
        enum : ['job','course'],
        default: 'course'
    },
    steps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
      }],
    user_id: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "porteuseDonneScenarioUser"
        }]

})

const scenario = mongoose.model('scenario',courseSchenma)

exports.Scenario = scenario;