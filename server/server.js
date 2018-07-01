// we're using path to make it easier to go from one directory to another instead of exiting one then going to another
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// so instead of going into server, then going out of it, then going to public, we go straight to public folder
const publicPath = path.join(__dirname, '../public'); // ...6-ChatApp/public
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Salim',
        text: 'How are you?',
        createdAt: 123
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})