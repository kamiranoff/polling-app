"use strict";

var React = require('react');

var Header = React.createClass({
  propTypes:{
    title: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <header>
      <h1>{this.props.title}</h1>
      <p>{this.props.speaker}</p>
      <span id="connection-status" className={this.props.status}></span>
      </header>
    );
  }
});

module.exports = Header;