const express = require("express");
const router = express.Router();
module.exports = router;
const {User} = require('../Models/user')
const {auth} = require('../Middlwares/middlewareAUTH');

//router.use(auth)

router.route('/').get((req, res) => {
  User.find()
  .then(reports => res.json(reports))
  .catch(err =>res.status(400).json('Error: '+err));
});


router.route('/add').post((req, res) => {
  const username = 'Missaoui khalil';
  const country = 'Tunisia';
  const email = 'khalil@gmail.com'

  const newUser = new Users.User({
      username,
      country,
      email 
  });

  newUser.save()
  .then(() => {res.json('User added !')})
  .catch(err =>res.status(400).json('Error: '+err));
});


router.post('/updateUser', async (req,res)=>{
   
    const user = await User.findByIdAndUpdate(req.user._id ,{
        $set : {
            username : req.body.firstName ,
            email : req.body.email ,
            intrest : req.body.intrest 
        }
    },{new: true})

    const result = await user.save()

    res.send(result)

})

router.post('/changeImage', async (req,res)=>{
   
    const user = await User.findByIdAndUpdate(req.user._id ,{
        $set : {
            imgpic : req.body.imgpic
        }
    },{new:true})

    const result = await user.save()
    
    res.send(result)

})

router.post('/webscarping' , async (req,res )=>{
  const result = await  x(`${req.body.linkedinurl}`)

    const user = await User.findByIdAndUpdate(req.user._id ,{
      $set : {
        situation : result.situation,
        competence: result.competence,
        school: result.school

      }
  },{new:true})
    
    const saveeduser = await user.save();
   
    res.send(result)



})


const puppeteer = require('puppeteer');

const x =(async (linkedinlink) => {
  try{
    
    const browser = await puppeteer.launch({headless:true , defaultViewport:null});
    const page = await browser.newPage();
    await page.goto(`${linkedinlink}`);
    await page.waitForNavigation();
    try{
      await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
      const isLoadingSucceeded = await page. $('.nav__button__muted--signin'). then (res =>!! res);
      if (isLoadingSucceeded) {
        console.log('acceced on the rare way mf');
        await clickSelector(page , ".nav__button__muted--signin")
        debugger;
        //email
        await typeEmail(page,"khalilyasu@gmail.com","#username");"#login-email"
        
        debugger;
        //pass
        await typePassword(page,"randomstranger","#password");"#login-password"
        debugger;  
        const secondbuttonshit = await page. $('.secondary-action'). then (res =>!! res);
        if (secondbuttonshit) {
          console.log('goes through the secondary action');
          await clickSelector(page , ".secondary-action")
        } 
        const rememberme = await page. $('.btn__primary--large'). then (res =>!! res);
        if (rememberme) {
          console.log('goes through the secondary action');
          await clickSelector(page , ".btn__primary--large")
        } 
        await page.waitForNavigation();
      } else {
        console.log('acceced on the typical way mf');
        await clickSelector(page , ".form-toggle")
        //email
     await typeEmail(page,"khalilyasu@gmail.com","#login-email");
     //pass
     await typePassword(page,"randomstranger","#login-password");
     await  page.waitForNavigation({ timeout: 10002 })


     const secondbuttonshit = await page. $('.secondary-action'). then (res =>!! res);
      if (secondbuttonshit) {
        console.log('goes through the secondary action');
        await clickSelector(page , ".secondary-action")
      } 
        const rememberme = await page. $('.btn__primary--large'). then (res =>!! res);
        if (rememberme) {
          console.log('btn__primary--large');
          await clickSelector(page , ".btn__primary--large")
        } 
      const isLoadingSucceeded = await page. $('.nav__button__muted--signin'). then (res =>!! res);
      if (isLoadingSucceeded) {
        console.log('acceced on the rare way mf');
        await clickSelector(page , ".nav__button__muted--signin")
        debugger;
        //email
        await typeEmail(page,"khalilyasu@gmail.com","#username");"#login-email"
        
        debugger;
        //pass
        await typePassword(page,"randomstranger","#password");"#login-password"
        debugger;  
        const secondbuttonshit = await page. $('.secondary-action'). then (res =>!! res);
        if (secondbuttonshit) {
          console.log('goes through the secondary action');
          await clickSelector(page , ".secondary-action")
        } 
        
      }
     
      } 
      
      //await waitTillHTMLRendered(page)
      await page.waitForSelector('#global-nav-search');

      await autoScroll(page);
      await page.waitForSelector('span[class="pv-skill-category-entity__name-text t-16 t-black t-bold"]')
      const foramtion = await page.$eval('h3[class="pv-entity__school-name t-16 t-black t-bold"]' , td => td.innerText)
       const situation = await page.$eval('div[class="text-body-medium break-words"]' , td => td.innerText)
       const text = await page.$$eval('span[class="pv-skill-category-entity__name-text t-16 t-black t-bold"]' , tds => tds.map((td) => {
         return td.innerText;
      }))
      
       let data = {'situation': situation ,'competence': text , 'school' : foramtion}
      
        await browser.close();
        return data;
      
      
    }
      catch(err){
        
      console.log('error',err);
    }
    
  }catch(err){console.log('error',err);}
  })




const clickSelector = async (page , selector) => {
  await page.waitForSelector(selector);
  await page.$eval(selector, (elem) => {elem.click({delay : 3000})
  debugger;
})
}

const typeEmail = async (page , text , id )=>{
  await page.waitForSelector(id)
  await page.type(id , text, {delay : 210})
}

const typePassword = async (page , text , id )=>{
  await page.waitForSelector(id)
  await page.type(id , text, {delay : 200})
  await page.keyboard.press("Enter");
}

//khalilyasu@gmail.com
//randomstranger

async function autoScroll(page){
  await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
  });
}


//i want you to remember how much it took us to do this . congrats xx

const waitTillHTMLRendered = async (page, timeout = 30000) => {
  const checkDurationMsecs = 1000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;

  while(checkCounts++ <= maxChecks){
    let html = await page.content();
    let currentHTMLSize = html.length; 

    let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);

    console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);

    if(lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize) 
      countStableSizeIterations++;
    else 
      countStableSizeIterations = 0; //reset the counter

    if(countStableSizeIterations >= minStableSizeIterations) {
      console.log("Page rendered fully..");
      break;
    }

    lastHTMLSize = currentHTMLSize;
    await page.waitFor(checkDurationMsecs);
  }  
};