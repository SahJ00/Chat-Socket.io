var express = require('express');

var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

app.use(express.static('client'));

var messages = [{
    id: 1,
    texto: 'Bienvenido al caht creado con node.js y socket.io',
    nick: 'Bot'
}]

io.on('connection', function (socket) {
    console.log('ALGUIEN SE CONECTO AL SOCKET')
    console.log('La ip es ---> ', socket.handshake.address)
    socket.emit('messages', messages)

    socket.on('add-message', function (data) {
        messages.push(data);
        io.sockets.emit('messages', messages)
    });
});

server.listen(6677, function () {
    console.log("Servidor OK en http://localhost:6677");
});