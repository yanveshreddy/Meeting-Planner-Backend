const mongoose = require('mongoose');
const shortid = require('shortid');

/* Libraries */
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib');

/* Models */
const EventModel=mongoose.model('Event');

/*Controller Functions */



// start getSingleEventDetails function 

let getSingleEventDetails =(req,res) =>{

    EventModel.findOne({ 'eventId': req.params.issueId }).exec((err, result) => {
        if (err) {
            logger.error(err.message, 'event Controller: getSingleEventDetails', 10)
            let apiResponse=response.generate(true,"Failed to find event Details",500,null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(result)) {
            logger.info('No event Found', 'event Controller: getSingleEventDetails')
            let apiResponse=response.generate(true,"No event found",404,null);
            res.send(apiResponse);
        }
        else {
            let apiResponse=response.generate(false,"Details Found",200,result);
            res.send(apiResponse);
        }
    })
}

//end getSingleEventDetails function

/****************************************************************************************************/

// start createEvent function 

let createEvent=(req,res) =>{

    const eventId = shortid.generate();


    let newEvent = new EventModel({

        eventId:eventId,
        eventTitle:req.body.eventTitle,
        eventPurpose:req.body.eventPurpose,
        eventPlace:req.body.eventPlace,
        eventStartTime:req.body.eventStartTime,
        eventEndTime:req.body.eventEndTime,
        adminId:req.body.adminId,
        adminUserName:req.body.adminUserName,
        userId:req.body.userId,
        userName: req.body.userName
    })

    newEvent.save((err,result) =>{
        if (err) {
            logger.error(err.message, 'Event Controller: createEvent', 10)
            let apiResponse=response.generate(true,"Failed to save Event Details",500,null);
            res.send(apiResponse);
        }
        
        else {
            let apiResponse=response.generate(false,"created succesfully",200,result);
            res.send(apiResponse);
        }

    })


}

//end createEvent function

/****************************************************************************************************/

// start updateEvent function 

let updateEvent=(req,res) =>{

    let options = req.body;


    EventModel.update({ 'eventId': req.params.eventId }, options, { multi: true }).exec((err, result) => {
        if (err) {
            logger.error(err.message, 'event Controller: updateEvent', 10)
            let apiResponse=response.generate(true,"Failed to find event Details",500,null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(result)) {
            logger.info('No event Found', 'event Controller: updateEvent')
            let apiResponse=response.generate(true,"No event found",404,null);
            res.send(apiResponse);
        }
        else {
            let apiResponse=response.generate(false,"Event updated succesfully",200,result);
            res.send(apiResponse);
        }
    })
}

//end updateEvent function


/****************************************************************************************************/

// start getEventListByUser function 

let getEventListByUser=(req,res) =>{

    EventModel.find({userId:req.body.userId},(err,result)=>{
        if (err) {
            let apiResponse = response.response(true,'Failed to get Event',403, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.response(true,'Events Are not found',500, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.response(false,'Events Are Listed', 200, result)
            res.send(apiResponse)
        }
       })
     



}

//end getEventListByUser function

/****************************************************************************************************/

// start deleteEvent function 

let deleteEvent=(req,res) =>{

    EventModel.findOneAndRemove({ 'eventId': req.params.eventId }).select(' -__v -_id -password').exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'IssueController: deleteIssue', 10)
            let apiResponse = response.generate(true, 'Failed To delete Issue', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Issue Found', 'IssueController: deleteIssue')
            let apiResponse = response.generate(true, 'No Issue Found', 404, null)
            res.send(apiResponse)
        } else {
            req.body.previous = req.body.previous.split('/uploads/')[1]
            fs.unlinkSync('./uploads/' +  req.body.previous);

            let apiResponse = response.generate(false, 'Deleted the Issue successfully', 200, result)
            res.send(apiResponse)
        }
    });



}

//end deleteEvent function

