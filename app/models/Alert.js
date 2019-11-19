/**
 * module dependencies
 */
const mongoose = require('mongoose')

const Schema = mongoose.Schema

let alertSchema = new Schema({

  alertId: { type: String, unique: true, required: true },
  senderName: { type: String, default: '' },
  senderId: { type: String, default: '' },
  receiverName: { type: String, default: '' },
  receiverId: { type: String, default: '' },
  meetingId: { type: String, default: '' },
  message: { type: String, default: '' },
  seen: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now }

})

mongoose.model('Alert', alertSchema);