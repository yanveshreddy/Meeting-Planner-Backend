const express = require('express');
//const router = express.Router();
const meetingController = require("../controllers/meetingController");
const appConfig = require("../../config/appConfig")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/meetings`;

    app.get(`${baseUrl}/:meetingId/meetingDetails`,meetingController.getSingleMeetingDetails);

     /**
     * @api {get} /api/v1/meetings/:meetingId/meetingDetails get single meeting
     * @apiVersion 1.0.0
     * @apiGroup meetings
     * 
     * 
     * @apiParam {String} authToken of the user passed as a body parameter
     * @apiParam {String} meetingId of the user passed as a body parameter
     * 
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"meeting Is Getting Successfully",
     *   "status":200,
     *   "data": [
     *              {
     *                userId:"string",
     *                meetingId:"string"
     *                title:"string",
     *                location :"string",
     *                purpose:"string",
     *                color:"string",
     *                startDate:"number",
     *                endDate:"number",
     *                startMinute:"number",
     *                endMinute:"number"
     *              }
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

    

    app.post(`${baseUrl}/createMeeting`,meetingController.createMeeting);

    /**
     * @api {post} /api/v1/meetings/createmeeting create meeting
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
     *   "data": [
     *              {
     *                userId:"string",
     *                userName:"string",
     *                adminId:"string",
     *                adminUserName:"string",
     *                meetingId:"string",
     *                meetingTitle:"string",
     *                meetingPlace :"string",
     *                meetingPurpose:"string",
     *                meetingDate:"date",
     *                meetingStartTime:"date",
     *                meetingEndTime:"date",
     *                created:"date",
     *                modified:"date"
     *              }
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


    app.put(`${baseUrl}/:meetingId/updatemeeting`,meetingController.updateMeeting);

      /**
     * @api {put} /api/v1/meetings/:meetingId/updatemeeting api for updating meeting
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
     *   "data": []  
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured",
     *      "status":400/500/403,
     *      "data":null
     *    }
     */

    app.get(`${baseUrl}/view/all`,meetingController.getAllMeetings)
     /**
     * @api {get} /api/v1/meetings/view/all get all meetings
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
     *                 userId:"string",
     *                userName:"string",
     *                adminId:"string",
     *                adminUserName:"string",
     *                meetingId:"string",
     *                meetingTitle:"string",
     *                meetingPlace :"string",
     *                meetingPurpose:"string",
     *                meetingDate:"date",
     *                meetingStartTime:"date",
     *                meetingEndTime:"date",
     *                created:"date",
     *                modified:"date"
     *              }
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


    app.get(`${baseUrl}/:userId/meetingListByUser`,meetingController.getMeetingListByUser);
    
     /**
     * @api {get} /api/v1/meetings/:userId/meetingListByUser get all meetings of user
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
     *                userId:"string",
     *                userName:"string",
     *                adminId:"string",
     *                adminUserName:"string",
     *                meetingId:"string",
     *                meetingTitle:"string",
     *                meetingPlace :"string",
     *                meetingPurpose:"string",
     *                meetingDate:"date",
     *                meetingStartTime:"date",
     *                meetingEndTime:"date",
     *                created:"date",
     *                modified:"date"
     *              }
     *           ]  
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured while retriving all meetings",
     *      "status":500,
     *      "data":null
     *    }
     */


    app.post(`${baseUrl}/:meetingId/deletemeeting`,meetingController.deleteMeeting);

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