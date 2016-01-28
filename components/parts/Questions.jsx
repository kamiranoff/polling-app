"use strict";

var React = require('react');

var Questions = React.createClass({
  ask(question){
    this.props.emit('ask',question);
  },
  addQuestion(question,i){
    return(
      <div key={i} className="">
      <span onClick={this.ask.bind(null,question)}>{question.q}</span>
      </div>
      );
  },

  render(){
    return(
      <div id="questions" className="">
       <h2>Questions</h2>
        {this.props.questions.map(this.addQuestion)}
      </div>
      );
  }

});

module.exports = Questions;