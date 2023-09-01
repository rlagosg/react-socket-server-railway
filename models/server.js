// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');

const Sockets = require('./sockets');

class Server {

    constructor(){

        this.app    = express();
        this.port   = process.env.PORT;

        // Http server
        this.server = http.createServer(this.app);

        // configuracion de Socket
        this.io = socketio(this.server, { /*  */});
    }

    middlewares(){
        //Desplegar el directorio publico
        this.app.use( express.static( path.resolve( __dirname, '../public')));
    }

    configurarSockets(){
        new Sockets(this.io);
    }

    execute(){

        //Inicializar mimddle
        this.middlewares();

        this.configurarSockets();

        //Inicializar Server
        this.server.listen( this.port, '0.0.0.0', () => { 
            console.log(`Servidor corriendo en el puerto ${this.port}`);
         });
    }

}

module.exports = Server;