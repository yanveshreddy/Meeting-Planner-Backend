const express = require('express');
const router = express.Router();
const eventController = require("../controllers/eventController");
const appConfig = require("../../config/appConfig")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/events`;

    app.get(`${baseUrl}/:eventId/eventDetails`,eventController.getSingleEventDetails);

    app.post(`${baseUrl}/createEvent`,eventController.createEvent);

    app.put(`${baseUrl}/:eventId/updateEvent`,eventController.updateEvent);

    app.post(`${baseUrl}/:eventId/deleteEvent`,eventController.deleteEvent);

    app.get(`${baseUrl}/:userId/eventList`,eventController.getEventListByUser);
    





}