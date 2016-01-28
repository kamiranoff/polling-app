"use strict";

var React = require('react');

var Header = React.createClass({
  propTypes:{
    title: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div>
        <div className="connection-status-container">
          <span id="connection-status" className={this.props.status}></span>
        </div>
        <header>

        <h1>{this.props.title}</h1>
        <p>{this.props.speaker}</p>

        </header>
      </div>
    );
  }
});

module.exports = Header;