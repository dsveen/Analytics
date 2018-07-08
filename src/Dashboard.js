import React, { Component } from 'react';
import axios from 'axios'; // promise-based API fetching library
import Chart from './Chart';

const recursiveClassify = (obj, properties, type, item) => {
	for(let i = 0; i < properties.length; i++) {
		if (properties[i] in obj && type === 'array') {
			obj[properties[i]].push(item);
		} else if (properties[i] in obj && type === 'object') {
			recursiveClassify(obj[properties[i]], [item.product], 'array', item);
		}	else {
			obj[properties[i]] = type === 'object' ? {} : [];
			recursiveClassify(obj, [properties[i]], type, item);
		}
	}
}

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			selection: 'All'
		}
		this.inputSelection = this.inputSelection.bind(this);
	}
	componentDidMount() {
    axios.get('/api')
    .then(response => {
			let data = {};
			response.data.forEach(item => recursiveClassify(data, [item.year, "All"], 'object', item));
			this.setState({ data });
		})
		.catch(err => console.log(err));
	}
	inputSelection(e) {
    this.setState({ selection: e.target.value });
	}

  render() {
    return (
      <div>
        <select onChange={this.inputSelection} value={this.state.selection}>
					{Object.keys(this.state.data).map(year => <option key={year} value={year}>{year}</option>)}
				</select>
				<Chart data={this.state.data[this.state.selection] || {}} selection={this.state.selection} classify={recursiveClassify} />
      </div>
    );
  }
}