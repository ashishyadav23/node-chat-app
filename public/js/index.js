var socket = io();
console.log(socket);
socket.on('connect', function () {
    console.log("Connected to server");
});

socket.on('disconnect', function () {
    console.log("Connection disconnected to server");
});

socket.on('newMessage', function (msg) {
    console.log("new Message Received", msg);
    document.write(JSON.stringify(msg));
});