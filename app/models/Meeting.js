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
    title: {
        type: String,
        required: true,
        default: ''
    },
    purpose: {
        type: String,
        required: true,
        default: ''
    },
    location: {
        type: String,
        required: true,
        default: ''
    },
    color: {
        type: String,
        default: '#1d71c5'
    },
    start:{
        type:Date,
        required:true
    },
    startHour:{
        type:Number,
        required:true
    },
    startMinute: {
        type: Number,
        required: true
    },
    
    end:{
        type: Date,
        required:true
    },
    endHour: {
        type: Number,
        required: true
    },
    endMinute: {
        type: Number,
        required: true
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

    }
    
},
{
    timestamps: true
});





mongoose.model('Meeting', meetingSchema);