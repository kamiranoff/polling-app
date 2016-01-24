var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var NotFound = React.createClass({
  render() {
    return (
      <div id="not-found">
      <h1>Nothing there</h1>
      <p>This page has not been found</p>
      <Link to="/">Join as Audience</Link>
      <Link to="/speaker">Start the presentation</Link>
      <Link to="/board">View the board</Link>
      </div>
    )
  }
});

module.exports = NotFound;