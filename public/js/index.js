var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
})

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
    var li = document.createElement("li");
    li.innerHTML = `${message.from}: ${message.text}`;
    document.getElementById('messages').appendChild(li);
})

document.getElementById('message-form').addEventListener('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: document.getElementsByName('message')[0].value
    }, function () {
        
    })
})