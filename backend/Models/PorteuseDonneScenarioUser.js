const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://saghir:saghirmennine922018@cluster0.tpkrk.mongodb.net/PI')
.then( ()=>{console.log('connected to MongoDB...')} )
.catch( (er)=> console.log(er) )

const courseSchenma = new mongoose.Schema({
    progress : Number ,
    state : {
        type: String,
        enum : ['done','Not_done'],
        default: 'Not_done'
    },
    scenario_id: 
        { required: true,
          type: mongoose.Schema.Types.ObjectId,
          ref: "scenario"
        },
    user_id:
        { required: true,
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        },


})

const porteuseDonneScenarioUser = mongoose.model('porteuseDonneScenarioUser',courseSchenma)

exports.PDUserScenario = porteuseDonneScenarioUser;