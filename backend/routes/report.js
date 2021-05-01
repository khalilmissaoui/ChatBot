const express = require("express");
const router = express.Router();
module.exports = router;
const {Report} = require('../Models/reports')

// /report
router.post('/add',async (req,res)=>{
    const report = new Report({
        'content' : req.body.content ,
        'img' : req.body.img,
        'sender' : req.body.sender
    })

    try{
        const result = await report.save();
        res.send(result)
        }
        catch(er){
            console.log(er);
        }
})


router.route('/').get((req, res) => {
    Report.find()
    .then(reports => res.json(reports))
    .catch(err =>res.status(400).json('Error: '+err));
});

// router.route('/add').post((req, res) => {
//     const id = 3;
//     const name = 'Samar';
//     const send_date = new Date('2014-11-20T03:11:00.000+00:00');
//     const role = 'Moderator';
//     const description = 'It took so long to refresh the page!!!';
//     const state = 'Not_fixed';

//     const newReport = new Reports.Report({
//         id,
//         name,
//         send_date,
//         role,
//         description,
//         state       
//     });

//     newReport.save()
//     .then(() => {res.json('Report added !')})
//     .catch(err =>res.status(400).json('Error: '+err));
// });

router.route('/delete/:id').delete( async (req,res) => {
    const id = req.params.id;
    Report.deleteOne({_id: id})
    .then(() => res.status(200).json({message: 'Report deleted successfully!'}))
    .catch(err => res.status(400).json({err}));
})

router.route('/update/:id').put( async (req,res) => {
    const id = req.params.id;
    const statusUpdate = req.body.statusUpdate;
    await Report.updateOne({_id: id},{state: statusUpdate})
    .then(() => res.status(200).json({message: 'Report updated successfully!'}))
    .catch(err => res.status(400).json({err}));
    
})