const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const PORT = process.env.PORT || 3000;
const { generateMessage, generateLocationMessage } = require('./utils/message');


io.on('connection', (socket) => {
    console.log("New user connected");
    socket.on('disconnect', () => {
        console.log("user closed tab");
    });
    socket.emit('from Admin', generateMessage("Admin", "Welcome to chat App"));
    socket.broadcast.emit('from Admin', generateMessage("Admin", "New user connected"));
    socket.on('createMessage', (msg, callback) => {
        console.log("text from client", msg);
        // socket.broadcast.emit('newMessage', generateMessage(msg.from, msg.text));
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        callback("Message delivered");
    });
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage("Admin", coords.latitude, coords.longitude));
    })
    socket.on('disconnect', () => {
        console.log("user client is disconnect");
    });
});
app.use(express.static(publicPath));
app.get('/home', (err, res) => {
    res.send("Hello");
})
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

