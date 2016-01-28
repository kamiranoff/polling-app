"use strict";

var React = require('react');
var Link = require('react-router').Link;
var ReactDOM = require('react-dom');

var Join = React.createClass({

  join() {
      var memberName = ReactDOM.findDOMNode(this.refs.fullName).value;
      this.props.emit('join',{name:memberName});
    },

    render() {
      return (
        <form action="javascript:void(0)" onSubmit={this.join}>
      <label>Full Name</label>
      <input ref="fullName" className="form-control" placeholder="Enter your full name..." required/>
      <button  className="join-button">Join</button>
      <Link to="/speaker">Join as speaker</Link>
      <Link to="/board">Go to the board</Link>
      </form>
      );
    }
})

module.exports = Join;
