"use strict";

var express = require('express');
var app = express();
var _ = require('underscore');
var server = app.listen(3000);
var io = require('socket.io').listen(server);



app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));



var connections = [];
var audience = [];
var title = "No presentation at the moment";
var speaker = {};
var questions = require('./app-questions');
var currentQuestion = false;
var results = {
  a: 0,
  b: 0,
  c: 0,
  d: 0
};

io.sockets.on('connection', function(socket) {

  socket.once('disconnect', function() {

    //get id of disconnected user
    var disconnectedMember = _.findWhere(audience, {
      id: this.id
    });

    //remove socket that has been disconnected
    if (disconnectedMember) {
      audience.splice(audience.indexOf(disconnectedMember), 1);
      io.sockets.emit('audience', audience);
      console.log('Left: %s (%s audience members)', disconnectedMember.name, audience.length);
    } else if (this.id === speaker.id) {
      console.log("%s has left. '%s' is over.", speaker.name, title);
      speaker = {};
      title = "No presentation at the moment";

      io.sockets.emit('end', {
        title: title,
        speaker: ''
      });
    }

    //remove socket that has been disconnected
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log("disconnected: %s sockets remaining", connections.length);
  });

  socket.on('join', function(payload) {
    var newMember = {
      id: this.id,
      name: payload.name,
      type: "audience"
    };

    this.emit('joined', newMember);
    audience.push(newMember);
    io.sockets.emit('audience', audience);
    console.log('Audience Joined %s', payload.name);
  });

  socket.on('start', function(payload) {
    speaker.name = payload.name;
    speaker.id = this.id;
    speaker.type = "speaker";
    title = payload.title;
    this.emit('joined', speaker);

    io.sockets.emit('start', {
      title: title,
      speaker: speaker.name
    });
    console.log("Presentation Started '%s' by '%s'", title, speaker.name);
  });



  socket.on('ask', function(question) {
    currentQuestion = question;
    results = {
      a: 0,
      b: 0,
      c: 0,
      d: 0
    };
    io.sockets.emit('ask', currentQuestion);
    console.log("Question Asked: '%s", question.q);
  });

  socket.on('answer', function(payload) {
    results[payload.choice]++;
    io.sockets.emit('results',results);
    console.log("Answer: '%s' %j", payload.choice, results);
  });

  socket.emit('welcome', {
    title: title,
    audience: audience,
    speaker: speaker.name,
    questions: questions,
    currentQuestion: currentQuestion,
    results: results

  });

  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);
});


console.log("Polling server is running at port 3000");
