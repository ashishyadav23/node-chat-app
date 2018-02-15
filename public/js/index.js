var socket = io();
console.log(socket);
socket.on('connect', function () {
    console.log("Connected to server");
    socket.on('from Admin', function (msg) {
        console.log("from Admin", msg);
    })
});

socket.on('disconnect', function () {
    console.log("Connection disconnected to server");
});

socket.on('newMessage', function (msg) {
    console.log("new Message Received", msg);
    var li = $('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);
    $('#messagesList').append(li);
});

socket.emit('createMessage', {
    from: "Suraj", text: "Hola,Greet from suraj"
}, function (ack) {
    console.log("Got it!", ack);
});

$('#chatForm').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'Ashish',
        text: $('#message').val()
    }, function (ack) {
        console.log("Got it!", ack);
    });
});