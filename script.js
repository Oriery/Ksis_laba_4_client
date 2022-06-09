var socket;
var lastMessageNickname = "";

socket = new WebSocket("ws://localhost:8000")

socket.onopen = () => {
    console.log("Socket is open");
}

socket.onmessage = (e) => {
    console.log("Message received");
    const mes = JSON.parse(e.data)
    var d = new Date();
    addMessage(mes.nickname, mes.message, d.toLocaleTimeString());
}

socket.onclose = () => {
    console.log("Socket closed");
}

document.getElementById("send").onclick = (e) => {
    e.preventDefault();
    socket.send(document.getElementById("messageInput").value);
}

function addMessage(nickname, mess, time) {
    let t_message = document.querySelector('#t_message');
    var cloneInt = t_message.content.cloneNode(true);

    cloneInt.querySelector('.time').innerHTML = time;
    cloneInt.querySelector('.message').innerHTML = mess;

    if (lastMessageNickname != nickname) {
        let allMessages = document.querySelector('#allMessages');
        let t_messagesFromOneUser = document.querySelector('#t_messagesFromOneUser');

        var cloneExt = t_messagesFromOneUser.content.cloneNode(true);

        cloneExt.querySelector('.nickname').innerHTML = nickname;
        cloneExt.querySelector('.messages_cont').appendChild(cloneInt);

        allMessages.appendChild(cloneExt);
    } else {
        document.querySelector('.messagesFromOneUser_cont:last-child')
            .querySelector('.messages_cont').appendChild(cloneInt);
    }

    lastMessageNickname = nickname;
}