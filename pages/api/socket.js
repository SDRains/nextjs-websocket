import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
    if (!res.socket.server.io) {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', socket => {
            socket.on('input-change', msg => {
                socket.broadcast.emit('update-input', msg)
            })

            socket.on('array-change', msg => {
                socket.broadcast.emit('update-array', msg)
            })

            socket.on('input2-change', msg => {
                socket.broadcast.emit('update-input2', msg)
            })
        })
    }
    res.end()
}

export default SocketHandler