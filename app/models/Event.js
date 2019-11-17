'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let eventSchema = new Schema({

    eventId: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    eventTitle: {
        type: String,
        required: true,
        default: ''
    },
    eventPurpose: {
        type: String,
        required: true,
        default: ''
    },
    eventPlace: {
        type: String,
        required: true,
        default: ''
    },
    eventDate:{
        type:Date,
        required:true
    },
    eventStartTime:{
        type:Date,
        required:true
    },
    eventEndTime:{
        type:Date,
        required:true
    },

    //event created by admin details
    adminId: {
        type: String,
        required: true
    },
    adminUserName: {
        type: String,
        required: true
    },

    //event assigned to user details
    userId: {
        type: String,
        required: true

    },
    userName: {
        type: String,
        required: true
    }
    
},
{
    timestamps: true
});





mongoose.model('Event', eventSchema);