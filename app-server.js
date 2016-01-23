/**
 * watching : Lynda – Building a Polling App with Socket IO and React.js
 * currenty at : 010 Handling disconnects
 */

"use strict";
var express = require('express');
var app = express();

var connections = [];

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000);
var io = require('socket.io').listen(server);



io.sockets.on('connection', function(socket) {

  socket.once('disconnect',function(){
    //remove socket that has been disconnected
    connections.splice(connections.indexOf(socket),1);
    socket.disconnect();
    console.log("disconnected: %s sockets remaining",connections.length);
  });

  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);
});


console.log("Polling server is running at port 3000");
