const express = require('express');
//const router = express.Router();
const meetingController = require("../controllers/meetingController");
const appConfig = require("../../config/appConfig")
const auth = require('../middlewares/auth');

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/meetings`;

    app.get(`${baseUrl}/:meetingId/getSingleMeeting`,auth.isAuthorized,meetingController.getSingleMeetingDetails);

     /**
     * @api {get} /api/v1/meetings/:meetingId/getSingleMeeting to get single meeting
     * @apiVersion 1.0.0
     * @apiGroup meetings
     * 
     * 
     * @apiParam {String} authToken of the user passed as a query parameter(required)
     * @apiParam {String} meetingId of the user passed as a url parameter(required)
     * 
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"Details Found",
     *   "status":200,
     *    "data": {
     *              "title": "meeting planner Review",
     *              "purpose": "to test application update",
     *              "location": "hyderabad",
     *              "color": "#00ff00",
     *              "meetingId": "47MChBzK",
     *              "start": "2019-11-30T20:30:00.000Z",
     *              "end": "2019-11-30T20:30:00.000Z",
     *              "startHour": 1,
     *              "startMinute": 33,
     *              "endHour": 20,
     *              "endMinute": 30,
     *              "adminId": "2g4DtolR",
     *              "adminUserName": "undefined",
     *              "userId": "ERE32e8s",
     *              "createdAt": "2019-11-25T20:26:57.707Z",
     *              "updatedAt": "2019-11-27T11:54:53.645Z"
     *            }
     *   }
     *               
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured",
     *      "status":400/500/403,
     *      "data":null
     *    }
     */

    

    app.post(`${baseUrl}/createMeeting`,auth.isAuthorized,meetingController.createMeeting);

    /**
     * @api {post} /api/v1/meetings/createmeeting api to create meeting
     * @apiVersion 1.0.0
     * @apiGroup meetings
     * 
     * 
     * @apiParam {String} meetingTitle meetingTitle of the meeting passed as a body parameter
     * @apiParam {String} meetingPurpose meetingPurpose of the meeting passed as a body parameter
     * @apiParam {String} meetingPlace meetingPlace of the meeting passed as a body parameter
     * @apiParam {String} userId userId of the user to whom meeting is assigned passed as a body parameter
     * @apiParam {String} userName userName of the user to whom meeting is assigned passed as a body parameter
     * @apiParam {String} adminId adminId of the user who created the meeting passed as a body parameter
     * @apiParam {String} adminUserName adminUserName of the user who created the meeting passed as a body parameter
     * @apiParam {String} meetingDate meetingDate of the meeting passed as a body parameter
     * @apiParam {String} meetingStartTime meetingStartTime of the meeting passed as a body parameter
     * @apiParam {String} meetingEndTime meetingEndTime of the meeting passed as a body parameter
     * @apiParam {String} authToken of the user passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"meeting Is Created Successfully",
     *   "status":200,
     *   "data":
     *           {
     *              "title": "meeting planner Review",
     *              "purpose": "to test application update",
     *              "location": "hyderabad",
     *              "color": "#00ff00",
     *              "meetingId": "47MChBzK",
     *              "start": "2019-11-30T20:30:00.000Z",
     *              "end": "2019-11-30T20:30:00.000Z",
     *              "startHour": 1,
     *              "startMinute": 33,
     *              "endHour": 20,
     *              "endMinute": 30,
     *              "adminId": "2g4DtolR",
     *              "adminUserName": "undefined",
     *              "userId": "ERE32e8s",
     *              "createdAt": "2019-11-25T20:26:57.707Z",
     *              "updatedAt": "2019-11-27T11:54:53.645Z"
     *            }  
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured",
     *      "status":400/500/403,
     *      "data":null
     *    }
     */


    app.put(`${baseUrl}/:meetingId/updateMeeting`,auth.isAuthorized,meetingController.updateMeeting);

      /**
     * @api {put} /api/v1/meetings/:meetingId/updateMeeting api to update meeting
     * @apiVersion 1.0.0
     * @apiGroup meetings
     * 
     * 
     * @apiParam {String} authToken of the user passed as a body parameter
     * @apiParam {String} meetingId of the user passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"meeting Is Edited Successfully",
     *   "status":200,
     *   "data": [
     *              "n": 1,
     *              "nModified": 1,
     *               "ok": 1
     *           ]  
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured",
     *      "status":400/500/403,
     *      "data":null
     *    }
     */

    app.get(`${baseUrl}/view/all`,auth.isAuthorized,meetingController.getAllMeetings)
     /**
     * @api {get} /api/v1/meetings/view/all to get all meetings
     * @apiVersion 1.0.0
     * @apiGroup meetings
     * 
     * 
     * @apiParam {String} authToken of the user passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"meetings  List",
     *   "status":200,
     *   "data": [
     *              {
     *              "title": "meeting planner Review",
     *              "purpose": "to test application update",
     *              "location": "hyderabad",
     *              "color": "#00ff00",
     *              "meetingId": "47MChBzK",
     *              "start": "2019-11-30T20:30:00.000Z",
     *              "end": "2019-11-30T20:30:00.000Z",
     *              "startHour": 1,
     *              "startMinute": 33,
     *              "endHour": 20,
     *              "endMinute": 30,
     *              "adminId": "2g4DtolR",
     *              "adminUserName": "giri prasad",
     *              "userId": "ERE32e8s",
     *              "createdAt": "2019-11-25T20:26:57.707Z",
     *              "updatedAt": "2019-11-27T11:54:53.645Z"
     *            },
     *            {
     *              "title": "test notification mail updated",
     *              "purpose": "to test application update",
     *              "location": "hyderabad",
     *              "color": "#00f500",
     *              "meetingId": "27MChBzK",
     *              "start": "2019-11-30T20:30:00.000Z",
     *              "end": "2019-11-30T20:30:00.000Z",
     *              "startHour": 1,
     *              "startMinute": 33,
     *              "endHour": 20,
     *              "endMinute": 30,
     *              "adminId": "5g4DtolR",
     *              "adminUserName": "test admin",
     *              "userId": "ERE32e8s",
     *              "createdAt": "2019-11-25T20:26:57.707Z",
     *              "updatedAt": "2019-11-27T11:54:53.645Z"
     *            }    
     * 
     *           ]  
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured",
     *      "status":400/500/403,
     *      "data":null
     *    }
     */


    app.get(`${baseUrl}/:userId/getAllMeetingsByUser`,auth.isAuthorized,meetingController.getMeetingListByUser);
    
     /**
     * @api {get} /api/v1/meetings/:userId/getAllMeetingsByUser to get all meetings of user
     * @apiVersion 1.0.0
     * @apiGroup meetings
     * 
     * 
     * @apiParam {String} userId of the user passed as a body parameter
     * @apiParam {String} authToken of the user passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"meetings of the user Are Listed",
     *   "status":200,
     *   "data": [
     *              {
     *              "title": "meeting planner Review",
     *              "purpose": "to test application update",
     *              "location": "hyderabad",
     *              "color": "#00ff00",
     *              "meetingId": "47MChBzK",
     *              "start": "2019-11-30T20:30:00.000Z",
     *              "end": "2019-11-30T20:30:00.000Z",
     *              "startHour": 1,
     *              "startMinute": 33,
     *              "endHour": 20,
     *              "endMinute": 30,
     *              "adminId": "2g4DtolR",
     *              "adminUserName": "giri prasad",
     *              "userId": "ERE32e8s",
     *              "createdAt": "2019-11-25T20:26:57.707Z",
     *              "updatedAt": "2019-11-27T11:54:53.645Z"
     *            },
     *            {
     *              "title": "test notification mail updated",
     *              "purpose": "to test application update",
     *              "location": "hyderabad",
     *              "color": "#00f500",
     *              "meetingId": "27MChBzK",
     *              "start": "2019-11-30T20:30:00.000Z",
     *              "end": "2019-11-30T20:30:00.000Z",
     *              "startHour": 1,
     *              "startMinute": 33,
     *              "endHour": 20,
     *              "endMinute": 30,
     *              "adminId": "5g4DtolR",
     *              "adminUserName": "test admin",
     *              "userId": "ERE32e8s",
     *              "createdAt": "2019-11-25T20:26:57.707Z",
     *              "updatedAt": "2019-11-27T11:54:53.645Z"
     *            }    
     * 
     *           ]  
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured while retriving all meetings of a user",
     *      "status":500,
     *      "data":null
     *    }
     */


    app.post(`${baseUrl}/:meetingId/deleteMeeting`,auth.isAuthorized,meetingController.deleteMeeting);

    /**
     * @api {post} /api/v1/meetings/deleteMeeting delete meeting
     * @apiVersion 1.0.0
     * @apiGroup meetings
     * 
     * 
     * @apiParam {String} authToken of the user passed as a body parameter
     * @apiParam {String} meetingId of the user passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"meeting Is Deleted Successfully",
     *   "status":200,
     *   "data": []  
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured while deleting",
     *      "status":500,
     *      "data":null
     *    }
     */
   
    
}