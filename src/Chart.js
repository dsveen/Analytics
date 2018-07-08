import React, { Component } from 'react';
import 'chart.js'; // open source library used for creating the pie chart
import { Pie } from 'react-chartjs-2'; // React wrapper for chart.js library
import 'chart.piecelabel.js'; // addon for chart.js to add labels on chart
import palette from 'google-palette'; // library for generating colors to be used in charting

import Grid from './Grid';

export default class Chart extends Component {
	constructor(props){
		super(props);
		this.state = {
			labels: [],
			data: [],
			gridData: {},
			year: '',
			product: ''
		}
	}
	componentWillReceiveProps(nextProps) {
		const labels = Object.keys(nextProps.data).length > 0 ? Object.keys(nextProps.data).map(product => product) : [];
		const data = [];
		labels.forEach(product => data.push(nextProps.data[product].reduce((acc, curr) => {
			return acc + curr.revenue;
		}, 0)));
		this.setState({ labels, data });
	}

	render() {
    return (
      <div>
				<Pie 
					data={{
						labels: this.state.labels,
						datasets: [{
							data: this.state.data,
							backgroundColor: Object.keys(this.props.data).length > 0 ? palette('tol-rainbow', Object.keys(this.props.data).length).map(color => `#${color}CC`) : [],
							hoverBackgroundColor: Object.keys(this.props.data).length > 0 ? palette('tol-rainbow', Object.keys(this.props.data).length).map(color => `#${color}`) : [],
						}],
					}}
					options={{
						onClick: (e, item) => {
							if (item.length > 0) {
								let gridData = {};
								let year = this.props.selection;
								let product = this.state.labels[item[0]._index];
								(this.props.data[this.state.labels[item[0]._index]]).forEach(item => this.props.classify(gridData, [item.country], 'object', item));
								this.setState({ gridData, year, product });
							}
						},
						animation: {
							duration: 1000,
						},
						responsive: true,
						pieceLabel: {
							render: (args) => '$' + args.value/1000000 + 'M',
							fontColor: 'black',
							precision: 0,
						},
						maintainAspectRatio: true,
						legend: {
							position: 'bottom',
						},
					}}
				/>
				<Grid gridData={this.state.gridData} year={this.state.year} product={this.state.product} />
      </div>
    );
  }
}