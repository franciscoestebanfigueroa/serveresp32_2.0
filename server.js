const http = require('http');
//const { env } = require('process');
const socketIO = require('socket.io');
const dotenv = require('dotenv').config(); 

const server = http.createServer();
const io = socketIO(server);

io.on('connection', socket => {
  console.log('Nuevo dispositivo conectado:', socket.id);
   
   

  socket.on('mensajex', data => {
    console.log('Mensaje desde ESP32 1:', data["nombre"]);
    console.log('Mensaje desde ESP32 2:', data["estado"]);
    // Aquí puedes realizar acciones en respuesta al mensaje del ESP32
    socket.broadcast.emit('mensajex', data);
    
  });
  
  
  socket.on('response',async data => {
    console.log('response', data);
    io.emit(" response ",data);
    // Aquí puedes realizar acciones en respuesta al mensaje del ESP32
  });
  

  

  socket.on('disconnect', () => {
    console.log('Dispositivo desconectado:', socket.id);
  });
});

//const PORT = 443; // Puedes cambiar el puerto si es necesario
server.listen(process.env.PORT, () => {
  console.log(`Servidor de sockets en funcionamiento en el puerto ${process.env.PORT}`);
});
