const WebSocket = require('ws')
require('dotenv').config()

const PORT = process.env.PORT

const server = new WebSocket.Server({ port: PORT }, () =>
  console.log(`Server listening to port: ${PORT}`)
)

let sockets = []
server.on('connection', (socket) => {
  sockets.push(socket)
  console.log(`${sockets.length} clients connected.`)

  // When you receive a message, send that message to every socket
  socket.on('message', (msg) => {
    sockets.forEach((s) => s.send(msg.toString()))
    console.log(`Received message: ${msg.toString()}`)
  })

  // When a socket closes or disconnets, remove it from the array
  socket.on('close', () => {
    sockets = sockets.filter((s) => s !== socket)
    console.log(`${sockets.length} clients connected.`)
  })
})
