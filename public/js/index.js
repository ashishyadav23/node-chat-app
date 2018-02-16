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
socket.on('newLocationMessage', function (msg) {
    console.log("new Message Received", msg);
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>')
    li.text(`${msg.from}: `);
    a.attr('href', msg.url);
    li.append(a);
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

var locationButton = $('#send-location');
locationButton.on('click', function () {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            socket.emit('createLocationMessage', {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
            })
        }, function (err) {
            alert("Unable to fetch Location!");
        })
    } else {
        alert("geoLocation is not supported by your browser");
    }
});