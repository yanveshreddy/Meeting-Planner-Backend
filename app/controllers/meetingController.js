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



// start getSingleMeetingDetails function 

let getSingleMeetingDetails =(req,res) =>{

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

//end getSingleMeetingDetails function

/****************************************************************************************************/

// start createMeeting function 

let createMeeting=(req,res) =>{

    const meetingId = shortid.generate();


    let newmeeting = new meetingModel({

        meetingId:meetingId,
        title:req.body.title,
        purpose:req.body.purpose,
        place:req.body.place,
        color: req.body.color,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        startHour: req.body.startHour,
        startMinute: req.body.startMinute,
        endHour: req.body.endHour,
        endMinute: req.body.endMinute,
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

//end createMeeting function

/****************************************************************************************************/

// start updatemeeting function 

let updateMeeting=(req,res) =>{

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

//end updateMeeting function
/****************************************************************************************************/

//start getAllMeetings function

let getAllMeetings=(req,res) =>{

    meetingModel.find()
    .select(' -__v -_id')
    .lean()
    .exec((err, result) => {

        if (err) {
            let apiResponse = response.response(true,'Failed to fetch list of meetings ',403, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.response(true,'meetings Are not found',500, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.response(false,'List of meetings', 200, result)
            res.send(apiResponse)
        }
       })
}

//end getAllMeetings function
/****************************************************************************************************/

// start getMeetingListByUser function 

let getMeetingListByUser=(req,res) =>{

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

//end getMeetingListByUser function
/****************************************************************************************************/


// start deleteMeeting function 

let deleteMeeting=(req,res) =>{

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

//end deleteMeeting function

/****************************************************************************************************/

module.exports={

    getSingleMeetingDetails:getSingleMeetingDetails,
    createMeeting:createMeeting,
    updateMeeting:updateMeeting,
    getAllMeetings:getAllMeetings,
    getMeetingListByUser:getMeetingListByUser,
    deleteMeeting:deleteMeeting

}