var React = require('react');
var ReactDOM = require('react-dom');

var JoinSpeaker = React.createClass({

  start() {
    var speakerName = ReactDOM.findDOMNode(this.refs.fullName).value;
    var title = ReactDOM.findDOMNode(this.refs.title).value;
    this.props.emit('start',{name:speakerName,title:title});
      },

    render() {
      return (
        <form action="javascript:void(0)" onSubmit={this.start}>

      <label>Full Name</label>
      <input ref="fullName" className="form-control" placeholder="Enter your full name..." required/>

      <label>Presentation Title</label>
      <input ref="title" className="form-control" placeholder="Enter a title for this presentation..." required/>
      <button  className="join-button">Join</button>
      </form>
      );
    }
})

module.exports = JoinSpeaker;
