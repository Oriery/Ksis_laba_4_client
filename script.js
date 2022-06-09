var socket;

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
    socket.send(document.getElementById("message").value);
}

function addMessage(who, mess, time) {
    document.getElementById("messages").innerHTML +=
        `<div class="message_cont"><div class="time">${time}</div><div class="who">${who}:</div><div class="message">${mess}</div></div>`;
}