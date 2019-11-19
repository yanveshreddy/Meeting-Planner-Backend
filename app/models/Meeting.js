'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let meetingSchema = new Schema({

    meetingId: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    meetingTitle: {
        type: String,
        required: true,
        default: ''
    },
    meetingPurpose: {
        type: String,
        required: true,
        default: ''
    },
    meetingPlace: {
        type: String,
        required: true,
        default: ''
    },
    meetingDate:{
        type:Date,
        required:true
    },
    meetingStartTime:{
        type:Date,
        required:true
    },
    meetingEndTime:{
        type:Date,
        required:true
    },

    //meeting created by admin details
    adminId: {
        type: String,
        required: true
    },
    adminUserName: {
        type: String,
        required: true
    },

    //meeting assigned to user details
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





mongoose.model('Meeting', meetingSchema);