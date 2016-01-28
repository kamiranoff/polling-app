"use strict";

var React = require('react');
var PieChart = require('react-d3').PieChart;
var Display = require('./parts/Display.jsx');

var Board = React.createClass({

  barGraphData(results) {
      return Object.keys(results).map(function(choice) {
        return {
          label: choice,
          value: results[choice]
        };
      });
    },

    render() {
      return (
        <div id="scoreboard">
      <Display if={this.props.states.status === 'connected' && this.props.states.currentQuestion}>

        <PieChart
          data={this.barGraphData(this.props.states.results)}
          title={this.props.states.currentQuestion.q}
          height={window.innerHeight * 0.6}
          width={window.innerWidth * 0.9}
          radius={100}
  innerRadius={20}
  sectorBorderColor="white"


        />
      </Display>

      <Display if={this.props.states.status === 'connected' && !this.props.states.currentQuestion}>
        <h3>Awaiting a question...</h3>
      </Display>

       <Display if={!this.props.states.status === 'connected'}>
       <h3>Our engineers are trying to connect you. Hold on a sec.</h3>
       </Display>
     </div>
      );
    }
});

module.exports = Board;
