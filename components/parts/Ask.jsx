"use strict";

var React = require('react');

var Display = require('./Display.jsx');
var Ask = React.createClass({

  getInitialState() {
      return {
        choices: [],
        answer: undefined
      };
    },


    componentWillMount() {
      this.setUpChoices();
    },

    componentWillReceiveProps() {
      this.setUpChoices();
    },

    setUpChoices() {
      var choices = Object.keys(this.props.question);
      choices.shift();
      this.setState({
        choices: choices,
        answer: sessionStorage.answer
      });
    },

    selectChoice(choice) {
      this.setState({
        answer: choice
      });
      sessionStorage.answer = choice;
      this.props.emit('answer', {
        question: this.props.question,
        choice: choice
      });
    },

    addChoiceButton(choice, i) {
      return (
        <button key={i} className="button-choice" onClick={this.selectChoice.bind(null,choice)}>
        {choice}: {this.props.question[choice]}
      </button>
      );

    },
    render() {
      return (
        <div id="currentQuestion">

      <Display if={this.state.answer}>

      <h3>You answered: {this.props.question[this.state.answer]}</h3>
      <h2 class="question-once-answered">{this.props.question.q}</h2>
      </Display>

      <Display if={!this.state.answer}>
        <h2>{this.props.question.q}</h2>
        <div className="choices">
          {this.state.choices.map(this.addChoiceButton)}
        </div>
      </Display>
      </div>
      );
    }

});


module.exports = Ask;
