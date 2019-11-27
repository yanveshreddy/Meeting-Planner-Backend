const mongoose = require('mongoose');
const shortid = require('shortid');

/* Libraries */
const time = require('../libs/timeLib');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');

var events = require('events');
var eventEmitter = new events.EventEmitter();
const nodemailer = require('nodemailer');

/* Models */
const meetingModel = mongoose.model('Meeting');
const UserModel = mongoose.model('User')
/*Controller Functions */

// start getSingleMeetingDetails function 

let getSingleMeetingDetails = (req, res) => {

    meetingModel.findOne({ 'meetingId': req.params.meetingId })
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
        if (err) {
            logger.error(err.message, 'meeting Controller: getSinglemeetingDetails', 10)
            let apiResponse = response.generate(true, "Failed to find meeting Details", 500, null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(result)) {
            logger.info('No meeting Found', 'meeting Controller: getSinglemeetingDetails')
            let apiResponse = response.generate(true, "No meeting found", 404, null);
            res.send(apiResponse);
        }
        else {
            let apiResponse = response.generate(false, "meeting Details Found", 200, result);
            res.send(apiResponse);
        }
    })
}

//end getSingleMeetingDetails function

/****************************************************************************************************/

// start createMeeting function 

let createMeeting = (req, res) => {

    const meetingId = shortid.generate();


    let newmeeting = new meetingModel({

        meetingId: meetingId,
        title: req.body.title,
        purpose: req.body.purpose,
        location: req.body.location,
        color: req.body.color,
        start: req.body.start,
        end: req.body.end,
        startHour: req.body.startHour,
        startMinute: req.body.startMinute,
        endHour: req.body.endHour,
        endMinute: req.body.endMinute,
        adminId: req.body.adminId,
        adminUserName: req.body.adminUserName,
        userId: req.body.userId,

    })

    newmeeting.save((err, result) => {
        if (err) {
            logger.error(err.message, 'meeting Controller: createmeeting', 10)
            let apiResponse = response.generate(true, "Failed to save meeting Details", 500, null);
            res.send(apiResponse);
        }

        else {
            let apiResponse = response.generate(false, "created succesfully", 200, result);
            res.send(apiResponse);
            // logger.info(result);
            eventEmitter.emit('sendMeetingCreatedMail', result);
        }

    })


}

//end createMeeting function

/****************************************************************************************************/

// start updatemeeting function 

let updateMeeting = (req, res) => {

    let options = req.body;
    let meetingId=req.params.meetingId;

    meetingModel.update({ 'meetingId': req.params.meetingId }, options, { multi: true }).exec((err, result) => {
        if (err) {
            logger.error(err.message, 'meeting Controller: updatemeeting', 10)
            let apiResponse = response.generate(true, "Failed to find meeting Details", 500, null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(result)) {
            logger.info('No meeting Found', 'meeting Controller: updatemeeting')
            let apiResponse = response.generate(true, "No meeting found", 404, null);
            res.send(apiResponse);
        }
        else {
            let apiResponse = response.generate(false, "meeting updated succesfully", 200, result);
            res.send(apiResponse);
            console.log(meetingId);

            meetingModel.findOne({ 'meetingId': meetingId }).exec((err, result) => {

                if (err) {
                    logger.error(err.message, 'meeting Controller: getSinglemeetingDetails', 10)
                   // let apiResponse = response.generate(true, "Failed to find meeting Details", 500, null);
                   // res.send(apiResponse);
                }
                else {
                    // let apiResponse = response.generate(false, "Details Found", 200, result);
                    // res.send(apiResponse);
                    console.log(result);
                    if(result){
                        eventEmitter.emit('sendMeetingUpdateMail', result);
                    }
                    
                }

            })
        }
    })
}
//end updateMeeting function
/****************************************************************************************************/

//start getAllMeetings function

let getAllMeetings = (req, res) => {

    meetingModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {

            if (err) {
                let apiResponse = response.generate(true, 'Failed to fetch list of meetings ', 403, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'meetings Are not found', 500, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'List of meetings', 200, result)
                res.send(apiResponse)
            }
        })
}

//end getAllMeetings function
/****************************************************************************************************/

// start getMeetingListByUser function 

let getMeetingListByUser = (req, res) => {

    meetingModel.find({ userId: req.params.userId }, (err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to get meeting', 403, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'meetings Are not found', 500, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'meetings Are Listed', 200, result)
            res.send(apiResponse)
        }
    })




}

//end getMeetingListByUser function
/****************************************************************************************************/


// start deleteMeeting function 

let deleteMeeting = (req, res) => {

    meetingModel.findOneAndRemove({ 'meetingId': req.params.meetingId }).select(' -__v -_id').exec((err, result) => {
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
            res.send(apiResponse);
            eventEmitter.emit('sendMeetingDeleteMail', result);
        }
    });

}

//end deleteMeeting function

/****************************************************************************************************/

//send email for  meeting creation code start
eventEmitter.on('sendMeetingCreatedMail', (data) => {
    if (data.userId) {
        UserModel.findOne({ userId: data.userId }, (err, userDetails) => {
            if (err) {
                logger.error('Error while finding user', 'meetingController: findUser()', 7)
            }
            else if (check.isEmpty(userDetails)) {

                logger.error('No User Found', 'meetingController: findUser()', 7)
            }
            else if (userDetails) {
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'meetingplanner.helpdesk@gmail.com',
                        pass: 'Mphelpdesk@004'
                    }
                });
                let mailOptions = {
                    from: 'meetingplanner.helpdesk@gmail.com',
                    to: userDetails.email,
                    subject: '"Meeting Created Alert"',
                    html: `<h2>Meeting scheduled</h2><br><h4>The Meeting ${data.title} has been scheduled </h4>
                          <p>Meeting will be start in ${data.start}</p>`

                }
                transporter.sendMail(mailOptions, function (err, data) {
                    if (err) {
                        logger.error('Mail sending Failed','sendMeetingCreatedMail');
                    }
                    else {
                        logger.info('Created alert email sent sucesfully','sendMeetingCreatedMail');
                    }
                })

            }
        });

    } else {
        logger.error('userId is missing','sendMeetingCreatedMail');
    }
});


//send email for meeting creation  code is end

/****************************************************************************************************/

//send email edit/update meeting code start


eventEmitter.on('sendMeetingUpdateMail', (data) => {

    if (data.userId) {
        UserModel.findOne({ userId: data.userId }, (err, userDetails) => {
            if (err) {
                logger.error('Error while finding user', 'meetingController', 7)
            }
            else if (check.isEmpty(userDetails)) {

                logger.error('No User Found', 'meetingController', 7)
            }
            else if (userDetails) {
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'meetingplanner.helpdesk@gmail.com',
                        pass: 'Mphelpdesk@004'
                    }
                });
                let mailOptions = {
                    from: 'meetingplanner.helpdesk@gmail.com',
                    to: userDetails.email,
                    subject: '"Meeting Updated Alert"',
                    html: `<h2>Meeting details are updated by ${data.adminUserName}</h2>
                                <br>
                            <h4>Updates to your scheduled "${data.title}" Meeting.Kindly Notice the changes and plan accordingly</h4>`

                }
                transporter.sendMail(mailOptions, function (err, data) {
                    if (err) {
                        
                        logger.error('Mail sending Failed','sendMeetingUpdateMail');
                    }
                    else {
                        logger.info('Update alert email sent sucesfully','sendMeetingUpdateMail');
                    }
                })

            }
        });

    } else {
        logger.error('userId is missing','sendMeetingUpdateMail');
       
    }

});

/****************************************************************************************************/

eventEmitter.on('sendMeetingDeleteMail', (data) => {
    if (data.userId) {
        UserModel.findOne({ userId: data.userId }, (err, userDetails) => {
            if (err) {
                logger.error('Error while finding user', 'meetingController: findUser()', 7)
            }
            else if (check.isEmpty(userDetails)) {

                logger.error('No User Found', 'meetingController: findUser()', 7)
            }
            else if (userDetails) {
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'meetingplanner.helpdesk@gmail.com',
                        pass: 'Mphelpdesk@004'
                    }
                });
                let mailOptions = {
                    from: 'meetingplanner.helpdesk@gmail.com',
                    to: userDetails.email,
                    subject: '"Meeting Planner Delete Alert"',
                    html: `<h2>Meeting Terminated</h2><br><h4>Your ${data.title} Meeting Is Cancelled by ${data.adminUserName}</h4>`

                }
                transporter.sendMail(mailOptions, function (err, data) {
                    if (err) {
                        logger.error('Mail sending Failed','sendMeetingDeleteMail');
                    }
                    else {
                        logger.info('Delete alert email sent sucesfully','sendMeetingDeleteMail');
                    }
                })

            }
        });

    } else {
        logger.error('userId is missing','sendMeetingDeleteMail');
    }
});



/****************************************************************************************************/


//send mail on  start time of event code is start
let sendAlarmMail = (userId, title, name) => {

    if (userId) {
        UserModel.findOne({ userId: userId }, (err, userDetails) => {
            if (err) {

                logger.error('Error while finding user', 'meetingController: findUser()', 7)
            }
            else if (check.isEmpty(userDetails)) {

                logger.error('No User Found', 'meetingController: findUser()', 7)
            } else {
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'meetingplanner.helpdesk@gmail.com',
                        pass: 'Mphelpdesk@004'
                    }
                });
                let mailOptions = {
                    from: 'meetingplanner.helpdesk@gmail.com',
                    to: userDetails.email,
                    subject: '"Meeting Planner Alarm Alert"',
                    html: `<h2>Event started</h2><br><h4>The scheduled Meeting ${req.body.title} created by  ${req.body.adminName} has started </h4>`
                }
                transporter.sendMail(mailOptions, function (err, data) {
                    if (err) {
                        logger.error('Mail sending Failed','sendAlarmMail');
                    }
                    else {
                        logger.info('Mail for alarm successfully sent','sendAlarmMail');
                        //console.log('Mail for alarm successfully sent')
                    }
                })

            }
        });

    } else {
        logger.error('userId is missing','sendAlarmMail');
    }
}
//function to send mail on start time of event 
/****************************************************************************************************/


module.exports = {

    getSingleMeetingDetails: getSingleMeetingDetails,
    createMeeting: createMeeting,
    updateMeeting: updateMeeting,
    getAllMeetings: getAllMeetings,
    getMeetingListByUser: getMeetingListByUser,
    deleteMeeting: deleteMeeting,
    sendAlarmMail: sendAlarmMail

}