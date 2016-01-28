"use strict";

var React = require('react');
var Display = require('./parts/Display.jsx');
var JoinSpeaker = require('./parts/JoinSpeaker.jsx');
var Attendance = require('./parts/Attendance.jsx');
var Questions = require('./parts/Questions.jsx');

var Speaker = React.createClass({
  render() {
    return (
      <div>
        <Display if={this.props.states.status === 'connected'}>
          <Display if={this.props.states.member.name && this.props.states.member.type === "speaker"}>

          <Questions questions={this.props.states.questions} emit={this.props.emit}/>
          <Attendance audience={this.props.states.audience}/>
        </Display>
        <Display if={!this.props.states.member.name}>
        <h2>Start the presentation</h2>
        <JoinSpeaker emit={this.props.emit}/>
        </Display>
        </Display>
      </div>
    );
  }
});

module.exports = Speaker;