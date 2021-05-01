const express = require("express");
const router = express.Router();
module.exports = router;
const {Scenario} = require('../Models/scenario')
const {User} = require('../Models/user')
const {PDUserScenario} = require('../Models/PorteuseDonneScenarioUser')
const {auth} = require('../Middlwares/middlewareAUTH');

router.use(auth)


router.get('/',(req,res)=>{
    res.send('inside the scenario')
})

router.get('/getallscenario', async (req,res)=>{
    const result = await Scenario.find()
    .populate({
        path : 'steps'
      }).populate({
        path : 'user_id'
      }).exec() ;
      //one to many - populate the other the progress first then find the name when u populate again
      res.send(result)
})

router.get('/getscenario', async (req,res)=>{
    const result = await Scenario.findById(req.body.scenario_id)
    .populate({
        path : 'steps'
      }).populate({
        path : 'user_id'
      }).exec() ;
      //one to many - populate the other the progress first then find the name when u populate again
      res.send(result)
})



router.post('/addscenario',async (req,res)=>{
    const scenario = new Scenario({
        title : req.body.title ,
        type : req.body.type,
        steps: req.body.steps
    })

    try{
        const result = await scenario.save();
        res.send(result)
        }
        catch(er){
            console.log(er);
        }
})

router.post('/selectedScenario',async(req,res)=>{
console.log(req.body.scenario_id) 
    
const pDUserScenario = new PDUserScenario({
    progress : 0 ,
    scenario_id : req.body.scenario_id ,
    user_id : req.user._id

} )
const result2 = await pDUserScenario.save();
const user = await User.findByIdAndUpdate(req.user._id,
{
    $set : {
        intrest : req.body.int,
        scenario_id : result2._id 
        
     }
   }

)

const scenarioo = await Scenario.findByIdAndUpdate(req.body.scenario_id,
{
    $push : {
        user_id : result2._id 
     }
   }
)
const result3 =await scenarioo.save();


try{
    const result = await user.save();
    res.send(result)
    }
    catch(er){
        console.log(er);
    }

})

router.get('/selectedScenarioByuserId', async (req,res)=>{
    const user = await User.findById(req.user._id)
    console.log('user id ',user.scenario_id);
    const result = await PDUserScenario.findById(user.scenario_id) 
    .populate({
        path : 'scenario_id',
        populate : {
          path : 'steps'
              }
    }).exec() ;
      //one to many - populate the other the progress first then find the name when u populate again
      res.send(result)
    
})

router.post('/updateProgress', async (req,res)=>{
    const user = await User.findById(req.user._id)

    const result = await PDUserScenario.findByIdAndUpdate(user.scenario_id,
    {
        $set : {
            progress : req.body.activeStep 
        }
    } , {new: true}

);

try{
    const response = await result.save();
    res.send(response)
    }
    catch(er){
        console.log(er);
    }
})
