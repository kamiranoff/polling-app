"use strict";

var React = require('react');
var io = require('socket.io-client');

var Header = require('./parts/Header.jsx');

var APP = React.createClass({

  getInitialState(){
    return{
      status:'disconnected'
    }

  },

  componentWillMount() {
      this.socket = io();
      this.socket.on('connect',this.connect);
      this.socket.on('disconnect', this.disconnect);
  },
  connect(){
    console.log("Connected: " + this.socket.id);
    this.setState({status:'connected'});
  },

  disconnect(){
    this.setState({status:'disconnected'});
  },

  render() {
    return (<Header title = "Polling application" status={this.state.status} />);
  }
});

module.exports = APP;
