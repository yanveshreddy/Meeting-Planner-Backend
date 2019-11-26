const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const meetingController = require("../controllers/meetingController");
const meetingModel = mongoose.model('Meeting');
// const tokenLib = require("./tokenLib.js");
// const NotificationModel = mongoose.model('Notification')

let setServer = (server) => {

    let allOnlineUsers = [];

    let io = socketio.listen(server);

    let myIo = io.of('')

    myIo.on('connection', (socket) => {

        socket.emit("verifyUser", "Some data");
        // code to verify the user and make him online

        //listen to set User Code Start

        socket.on('set-user', (authToken) => {

            tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {
                if (err) {

                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                }
                else {

                    console.log("user is verified..setting details");
                    let currentUser = user.data;
                    // setting socket user id 
                    socket.userId = currentUser.userId
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                    console.log(`${fullName} has Logged in successfully`);

                    let userObject = { userId: currentUser.userId, fullName: fullName }
                    allOnlineUsers.push(userObject);
                    console.log(allOnlineUsers);

                    // // setting room name
                    socket.room = ''
                    // joining chat-group room.
                    socket.join(socket.room)
                    socket.to(socket.room).broadcast.emit('online-user-list', allOnlineUsers);

                }


            })

        }) // end of listening set-user event


        //create notify code start
        socket.on('Create-Meeting', (data) => {
            socket.broadcast.emit(`${data.userId} create`, data)
        })
        //create notify code end


        //edit notify code start
        socket.on('Update-Meeting', (data) => {
            socket.broadcast.emit(`${data.userId} update`, data)
        })
        //edit notify code end

        //Delete code start
        socket.on('Delete-Meeting', (data) => {
            socket.broadcast.emit(`${data.userId} delete`, data)
        })
        //Delete code end


        socket.on('disconnect', () => {
            // disconnect the user from socket
            // remove the user from online list
            // unsubscribe the user from his own channel

            console.log('\x1b[33m', "user is disconnected", '\x1b[0m');
            console.log(socket.userId);

            var removeIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(socket.userId);
            allOnlineUsers.splice(removeIndex, 1)

            console.log('\x1b[36m', allOnlineUsers, '\x1b[0m');

            socket.leave(socket.room)
            socket.to(socket.room).broadcast.emit('online-user-list', allOnlineUsers);


        }) // end of on disconnect

        //function for meeting starting alarm code start
        setInterval( () =>{
            meetingModel.find()
                .select(' -__v -_id')
                .lean()
                .exec((err, result) => {
                    if (err) {
                        console.log(err)

                    } else if (check.isEmpty(result)) {

                    } else {
                        let minutes = new Date().getMinutes()
                        let hours = new Date().getHours()
                        let month = new Date().getMonth()
                        let day = new Date().getDay()

                        for (let meeting of result) {
                            meetingMonth = (new Date(meeting.start).getMonth())
                            meetingDay = (new Date(meeting.start).getDay())
                            if (minutes == meeting.startMinute - 30 && hours == meeting.startHour - 5 && month == meetingMonth && day == meetingDay) {
                                meetingController.sendAlarmMail(meeting.userId, meeting.title, meeting.adminName)
                                data = { adminName: meeting.adminName, userId: meeting.userId, title: meeting.title }
                                myio.emit('alarm', data);
                            }
                        }

                    }
                })

        }, 100000)
        //staring for event starting code is end


    })


}

module.exports = {
    setServer: setServer
}