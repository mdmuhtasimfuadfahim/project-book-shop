

export function messageController(){
const socket = io()
console.log(name)
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let name;

// if(window.location.pathname === '/customer/message' || window.location.pathname === '/admin/view-messages'){
//     do {
//         name = prompt('Please enter your name: ')
//     } while(!name)
// }

if(!textarea){
    return;
}
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
     let getH4Class = document.querySelector('.give_data')
        let msg = {
            user: getH4Class.dataset.username,
            message: message.trim()
        }
            // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

}