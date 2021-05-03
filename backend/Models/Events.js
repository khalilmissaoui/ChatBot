const courseSchenma = new mongoose.Schema({
    title: String ,
    start_date : Date ,
    end_date : Date ,
    description : String ,
    type : String ,
    domain: { type : Array , "default" : ["default"] },
    location : String ,
    subs_id :  [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        }]

})

const event = mongoose.model('event',courseSchenma)

