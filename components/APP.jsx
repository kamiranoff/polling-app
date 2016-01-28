"use strict";

var React = require('react');
var io = require('socket.io-client');

var Header = require('./parts/Header.jsx');

var APP = React.createClass({

  getInitialState() {
      return {
        status: 'disconnected',
        title: '',
        member: {},
        audience: [],
        speaker: '',
        questions: [],
        currentQuestion: false,
        results: {}
      };
    },

    componentWillMount() {
      this.socket = io();
      this.socket.on('connect', this.connect);
      this.socket.on('disconnect', this.disconnect);
      this.socket.on('welcome', this.updateState);
      this.socket.on('joined', this.joined);
      this.socket.on('audience', this.updateAudience);
      this.socket.on('start', this.start);
      this.socket.on('end', this.updateState);
      this.socket.on('ask', this.ask);
      this.socket.on('results', this.updateResults);
    },

    emit(eventName, payload) {
      this.socket.emit(eventName, payload);
    },

    connect() {
      var member;
      if (sessionStorage.member) {
        member = JSON.parse(sessionStorage.member);
      } else {
        member = null;
      }
      console.log('member', member);
      if (member && member.type === 'audience') {
        this.emit('join', member);
      } else if (member && member.type === 'speaker') {
        this.emit('start', {
          name: member.name,
          title: sessionStorage.title
        });
      }
      this.setState({
        status: 'connected'
      });
    },

    disconnect() {
      this.setState({
        status: 'disconnected',
        title: 'disconnected',
        speaker: ''
      });
    },
    updateState(serverState) {
      this.setState(serverState);
    },

    joined(member) {
      sessionStorage.member = JSON.stringify(member);
      this.setState({
        member: member
      });
    },

    updateAudience(newAudience) {
      this.setState({
        audience: newAudience
      });
    },

    start(presentation) {
      if (this.state.member.type === 'speaker') {
        sessionStorage.title = presentation.title;
      }
      this.setState(presentation);
    },

    ask(question) {
      sessionStorage.answer = '';
      this.setState({
        currentQuestion: question,
        results: {a:0,b:0,c:0,d:0}
      });
    },

    updateResults(data) {
      this.setState({
        results: data
      });
    },

    render() {
      return (
        <div>
      <Header {...this.state} />
      {this.props.children && React.cloneElement(this.props.children,{states:this.state,emit:this.emit})}
      </div>
      );
    }
});

module.exports = APP;
