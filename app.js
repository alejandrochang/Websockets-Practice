window.onload = function() {
    // Get references to elements on the page
    var form = document.getElementById('message-form');
    var messageField = document.getElementById('message');
    var messagesList = document.getElementById('messages');
    var socketStatus = document.getElementById('status');
    var closeBtn = document.getElementById('close');

    //Rest of code

    var socket = new WebSocket('ws://echo.websocket.org');

    socket.onopen = function(event) {
        socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.url;
        socketStatus.className = 'open';
    };

    socket.onerror = function(error) {
        console.log('WebSocket Error: ' + error);
    };

    form.onsubmit = function(e) {
        e.preventDefault();

        var message = messageField.value;

        socket.send(message);

        messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + message + '</li>';

        messageField.value = '';

        return false;
    }

    socket.onmessage = function(event) {
        var message = event.data;
        messagesList.innerHTML += '<li class="received"><span>Received:</span>' + message + '</li>';
    };

    socket.onclose = function(event) {
        socketStatus.innerHTML = 'Disconnected from WebSocket.';
        socketStatus.className = 'closed';
    };

    closeBtn.onclick = function(e) {
        e.preventDefault();

        socket.close();

        return false;
    }
};