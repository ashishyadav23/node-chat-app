const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const PORT = process.env.PORT || 3000;


io.on('connection', (socket) => {
    console.log("New user connected");
    socket.on('disconnect', () => {
        console.log("user closed tab");
    });
    socket.on('createMessage', (msg) => {
        console.log("text from client", msg);
        io.emit('newMessage', {
            from: msg.from,
            text: msg.text,
            createAt: new Date().getTime()
        });
    });
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

