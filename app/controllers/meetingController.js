const mongoose = require('mongoose');
const shortid = require('shortid');

/* Libraries */
const time = require('../libs/timeLib');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');

/* Models */
const meetingModel=mongoose.model('Meeting');

/*Controller Functions */



// start getSinglemeetingDetails function 

let getSinglemeetingDetails =(req,res) =>{

    meetingModel.findOne({ 'meetingId': req.params.meetingId }).exec((err, result) => {
        if (err) {
            logger.error(err.message, 'meeting Controller: getSinglemeetingDetails', 10)
            let apiResponse=response.generate(true,"Failed to find meeting Details",500,null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(result)) {
            logger.info('No meeting Found', 'meeting Controller: getSinglemeetingDetails')
            let apiResponse=response.generate(true,"No meeting found",404,null);
            res.send(apiResponse);
        }
        else {
            let apiResponse=response.generate(false,"Details Found",200,result);
            res.send(apiResponse);
        }
    })
}

//end getSinglemeetingDetails function

/****************************************************************************************************/

// start createmeeting function 

let createmeeting=(req,res) =>{

    const meetingId = shortid.generate();


    let newmeeting = new meetingModel({

        meetingId:meetingId,
        meetingTitle:req.body.meetingTitle,
        meetingPurpose:req.body.meetingPurpose,
        meetingPlace:req.body.meetingPlace,
        meetingStartTime:req.body.meetingStartTime,
        meetingEndTime:req.body.meetingEndTime,
        adminId:req.body.adminId,
        adminUserName:req.body.adminUserName,
        userId:req.body.userId,
        userName: req.body.userName
    })

    newmeeting.save((err,result) =>{
        if (err) {
            logger.error(err.message, 'meeting Controller: createmeeting', 10)
            let apiResponse=response.generate(true,"Failed to save meeting Details",500,null);
            res.send(apiResponse);
        }
        
        else {
            let apiResponse=response.generate(false,"created succesfully",200,result);
            res.send(apiResponse);
        }

    })


}

//end createmeeting function

/****************************************************************************************************/

// start updatemeeting function 

let updatemeeting=(req,res) =>{

    let options = req.body;


    meetingModel.update({ 'meetingId': req.params.meetingId }, options, { multi: true }).exec((err, result) => {
        if (err) {
            logger.error(err.message, 'meeting Controller: updatemeeting', 10)
            let apiResponse=response.generate(true,"Failed to find meeting Details",500,null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(result)) {
            logger.info('No meeting Found', 'meeting Controller: updatemeeting')
            let apiResponse=response.generate(true,"No meeting found",404,null);
            res.send(apiResponse);
        }
        else {
            let apiResponse=response.generate(false,"meeting updated succesfully",200,result);
            res.send(apiResponse);
        }
    })
}

//end updatemeeting function


/****************************************************************************************************/

// start getmeetingListByUser function 

let getmeetingListByUser=(req,res) =>{

    meetingModel.find({userId:req.body.userId},(err,result)=>{
        if (err) {
            let apiResponse = response.response(true,'Failed to get meeting',403, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.response(true,'meetings Are not found',500, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.response(false,'meetings Are Listed', 200, result)
            res.send(apiResponse)
        }
       })
     



}

//end getmeetingListByUser function

/****************************************************************************************************/

// start deletemeeting function 

let deletemeeting=(req,res) =>{

    meetingModel.findOneAndRemove({ 'meetingId': req.params.meetingId }).select(' -__v -_id -password').exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'meetingController: deletemeeting', 10)
            let apiResponse = response.generate(true, 'Failed To delete meeting', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No meeting Found', 'meetingController: deletemeeting')
            let apiResponse = response.generate(true, 'No meeting Found', 404, null)
            res.send(apiResponse)
        } else {
           
           // req.body.previous = req.body.previous.split('/uploads/')[1]
           // fs.unlinkSync('./uploads/' +  req.body.previous);

            let apiResponse = response.generate(false, 'Deleted the meeting successfully', 200, result)
            res.send(apiResponse)
        }
    });



}

//end deletemeeting function

