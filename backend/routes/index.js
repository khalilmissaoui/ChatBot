const express = require("express");
const router = express.Router();
module.exports = router;

const {User} = require('../Models/user')
const {Course} = require('../Models/Course')
const {PDUserScenario} = require('../Models/PorteuseDonneScenarioUser')
const {Scenario} = require('../Models/scenario')

const {auth} = require('../Middlwares/middlewareAUTH');

const uuid = require('uuid');
const config = require('../config/dev')

const ServiceAccount = require('../authkey.json')

router.use(auth)

//getting the keys to use our api 
const projectId = config.googleProjectID
const sessionId = config.dialogFlowSessionID

const credentials = {
    credential : ServiceAccount
}


const dialogflow = require('@google-cloud/dialogflow');


// Instantiates a session client
const sessionClient = new dialogflow.SessionsClient({credential:credentials});
const sessionPath = sessionClient.projectAgentSessionPath(
  projectId,
  sessionId
);

router.post('/changescenarioEvent',async (req,res)=>{

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        // The query to send to the dialogflow agent
        name: req.body.msg,
        // The language used by the client (en-US)
        languageCode: config.dialogFlowSessionLanguageCode,
      },
    },
  };
 try
  {
  // Send request and log result too
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  BotAnswer = {
    source : 'bot',
    msg : result.fulfillmentMessages[0].text.text[0]
  }
  await User.findByIdAndUpdate(req.user._id ,
  {
    $push : {
       messages :  {
                "source": "bot",
                "msg": result.fulfillmentMessages[0].text.text[0],
                "time":Date.now
              } //inserted data is the object to be inserted 
     }
   }
  
  );
  
  res.send(BotAnswer)
 }
 catch(err){
     console.log('******************************************************************************** \n' , err);

 }    

})

router.get('/',(req,res)=>{
    console.log(projectId , ' and this is ',sessionId);
    res.send('hellow')
})

//commented the user and bot saving messaging into db 
router.post('/',async (req,res)=>{
  //find the user from the data base : test purpose , we will delete this later cuz its not the best practice
  await User.findByIdAndUpdate(req.user._id ,
  {
    $push : {
       messages :  {
                "source": "user",
                "msg": req.body.msg
              } 
     }
   }
  );
  
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: req.body.msg,
        // The language used by the client (en-US)
        languageCode: config.dialogFlowSessionLanguageCode,
      },
    },
  };
 try
  {
  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
    if(result.fulfillmentMessages[0].text.text[0]=='job' || result.fulfillmentMessages[0].text.text[0]=='course'){
      BotAnswer = {
        source : 'bot',
        msg : `i changed your scenario to ${result.fulfillmentMessages[0].text.text[0]} , check your new path :) `
      }

      if(result.fulfillmentMessages[0].text.text[0]=='job'){
        const pDUserScenario = new PDUserScenario({
          progress : 0 ,
          scenario_id : "6079b194c8963e343492bc27" ,
          user_id : req.user._id
      
      } )
      const result2 = await pDUserScenario.save();
      const user = await User.findByIdAndUpdate(req.user._id,
      {
          $set : {
              scenario_id : result2._id 
           }
         }
      
      )
      
      const scenarioo = await Scenario.findByIdAndUpdate("6079b194c8963e343492bc27",
      {
          $push : {
              user_id : result2._id 
           }
         }
      )
      const result3 =await scenarioo.save();
      const result = await user.save();
      }

      if(result.fulfillmentMessages[0].text.text[0]=='course'){
        const pDUserScenario = new PDUserScenario({
          progress : 0 ,
          scenario_id : "6079b5d5abf55524d88bf15f" ,
          user_id : req.user._id
      
      } )
      const result2 = await pDUserScenario.save();
      const user = await User.findByIdAndUpdate(req.user._id,
      {
          $set : {
              scenario_id : result2._id 
           }
         }
      
      )
      
      const scenarioo = await Scenario.findByIdAndUpdate("6079b5d5abf55524d88bf15f",
      {
          $push : {
              user_id : result2._id 
           }
         }
      )
      const result3 =await scenarioo.save();
      const result = await user.save();
      }

      //here we gonna set his scenario then answer the user
      res.send(BotAnswer)
    }
      else{
        BotAnswer = {
          source : 'bot',
          msg : result.fulfillmentMessages[0].text.text[0]
        }
        await User.findByIdAndUpdate(req.user._id ,
        {
          $push : {
             messages :  {
                      "source": "bot",
                      "msg": result.fulfillmentMessages[0].text.text[0]
                    } //inserted data is the object to be inserted 
           }
         }
        );
        res.send(BotAnswer)
      }
  
 }
 catch(err){
     console.log('******************************************************************************** \n' , err);

 }    
})
//"60380e67e557ee5e0c8921f6"
router.get('/getcurrentuser',auth,async(req,res)=>{
  console.log('the payload day motherfuakakak',req.user);
  const result = await User.findById(req.user._id)
  res.send(result);
})


// router.post('/addmessage',async(req,res)=>{


// try{
//   const result = await User.findByIdAndUpdate("60380e67e557ee5e0c8921f6" ,
//   {
//     $push : {
//        messages :  {
//                 "source": "user",
//                 "msg": "timestamp",
//                 "time":Date.now
//               } //inserted data is the object to be inserted 
//      }
//    }
  
//   );
  
//   res.send(result)
//   }
//   catch(er){
//       console.log(er);
//   }
// })


router.post('/events',async (req,res)=>{
  const user =await User.findById(req.user._id);
  if(user.messages.length!=0){

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          // The query to send to the dialogflow agent
          name: req.body.msg,
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
    };
    try
    {
      // Send request and log result too
      const responses = await sessionClient.detectIntent(request);
      console.log('Detected intent');
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      BotAnswer = {
        source : 'bot',
        msg : result.fulfillmentMessages[0].text.text[0]
      }
      await User.findByIdAndUpdate(req.user._id ,
      {
        $push : {
          messages :  {
            "source": "bot",
            "msg": result.fulfillmentMessages[0].text.text[0],
            "time":Date.now
          } //inserted data is the object to be inserted 
        }
      }
      
      );
      
      res.send(BotAnswer)
    }
    catch(err){
      console.log('******************************************************************************** \n' , err);
      
    }    
  }
})


router.post('/selectedscenario',async (req,res)=>{

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          // The query to send to the dialogflow agent
          name: req.body.msg,
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
    };
    try
    {
      // Send request and log result too
      const responses = await sessionClient.detectIntent(request);
      console.log('Detected intent');
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      BotAnswer = {
        source : 'bot',
        msg : result.fulfillmentMessages[0].text.text[0]
      }
      await User.findByIdAndUpdate(req.user._id ,
      {
        $push : {
          messages :  {
            "source": "bot",
            "msg": 'you have choosed your scenario here ',
            "time":Date.now
          } //inserted data is the object to be inserted 
        }
      }
      
     );
      
      res.send(BotAnswer)
    }
    catch(err){
      console.log('******************************************************************************** \n' , err);
      
    }    
  
})


router.post('/logout',async (req,res)=>{
  
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        // The query to send to the dialogflow agent
        name: req.body.msg,
        // The language used by the client (en-US)
        languageCode: config.dialogFlowSessionLanguageCode,
      },
    },
  };
 try
  {
  // Send request and log result too
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  BotAnswer = {
    source : 'bot',
    msg : result.fulfillmentMessages[0].text.text[0]
  }
  await User.findByIdAndUpdate(req.user._id ,
  {
    $push : {
       messages :  {
                "source": "bot",
                "msg": result.fulfillmentMessages[0].text.text[0],
                "time":Date.now
              } //inserted data is the object to be inserted 
     }
   }
  
  );
  
  res.send(BotAnswer)
 }
 catch(err){
     console.log('******************************************************************************** \n' , err);

 }    
})


//add dates to other messages ;

const x = async () =>{

}