// we're using path to make it easier to go from one directory to another instead of exiting one then going to another
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

// so instead of going into server, then going out of it, then going to public, we go straight to public folder
const publicPath = path.join(__dirname, '../public'); // ...6-ChatApp/public
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit() emits an event to a single connection
    // io.emit() emits an event to every single connection
    // Broadcasting an event will send it to all the other sockets in the namespace except for yourself
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})