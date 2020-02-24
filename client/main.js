var socket = io.connect('http://172.16.217.15:6677', {
    'ForceNew': true
});

socket.on('messages', function (data) {
    render(data);
});

function render(data) {
    var html = data.map(function (message, index) {
        return (`
        <div class="message">
            <strong>${message.nick} dice:</strong>
            <p>${message.texto}</p>
        </div>
        `)
    }).join(' ');

    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    var message = {
        texto: document.getElementById('text').value,
        nick: document.getElementById('nickname').value
    };

    document.getElementById('nickname').style.display = 'none';

    socket.emit('add-message', message);
    return false;
}