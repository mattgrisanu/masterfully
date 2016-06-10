"use strict"

var React = require('react');
var ReactDOM = require('react-dom');
// var Chart = require('react-d3-core').Chart;
// var LineChart = require('react-d3-basic').LineChart;
import rd3 from 'rd3';
var LineChart = rd3.LineChart;


export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: this.props.data,
      lineData:[
        { 
          name: 'Performance',
          values: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
          strokeWidth: 3        }
      ]
    };
  }


  render() {
    return (
      <LineChart
        legend={true}
        data={this.state.lineData}
        width='80%'
        height={300}
        viewBoxObject={{
          x: 0,
          y: 0,
          width: 500,
          height: 300
        }}
        title="Performance Over Time"
        yAxisLabel="Performance"
        xAxisLabel="Session#"
        domain={{x: [,6], y: [-10,]}}
        gridHorizontal={true}
      />
    )
  }
};


