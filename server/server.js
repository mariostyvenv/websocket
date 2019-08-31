const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//IO = esta es la comunicación del backend
let io = socketIO(server);
io.on('connection', (client) => {
    console.log('Usuario Conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicacion'
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
    //Escuchar al cliente
    client.on('enviarMensaje', (mensaje, callback) => {
        console.log(mensaje);

        client.broadcast.emit('enviarMensaje', mensaje);
        /*if (mensaje.usuario) {
            callback({
                resp: 'Todo salió Bien'
            });
        } else {
            callback({
                resp: 'Todo Salió Mal'
            });
        }*/

    });
});


server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});