const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container')
const name = prompt("Enter your name to join LetsChat")
socket.emit('new-user-joined', name);
var audio = new Audio('sound.wav')
const append=(message,position)=>{    // position is left or right
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='right')
    audio.play();
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'left');
    socket.emit('send', message);
    messageInput.value = '';
})

socket.on('user-joined',name=>{
    append(`${name} joined the chat.`,'right')
})
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`, 'right')
})
socket.on('left', name=>{
    append(`${name } left the chat`, 'left');
}) 