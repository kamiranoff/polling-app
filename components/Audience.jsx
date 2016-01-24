"use strict";

var React = require('react');

var Display = require('./parts/Display.jsx');
var Join = require('./parts/Join.jsx');

var Audience = React.createClass({
  render() {
    return (
      <div>
        <Display if={this.props.states.status === "connected"}>

          <Display if={this.props.states.member.name}>
            <h1>Welcome {this.props.states.member.name}</h1>
            <p>{this.props.states.audience.length} audience members connected</p>
            <p>Questions will appear here</p>
          </Display>

          <Display if={!this.props.states.member.name}>
            <h1>Join the session</h1>
           <Join emit={this.props.emit}/>
          </Display>


        </Display>
      </div>

    );
  }
});

module.exports = Audience;
