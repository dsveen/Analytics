import React, { Component } from 'react';
import axios from 'axios'; // promise-based API fetching library
import Chart from './Chart';

const recursiveClassify = (obj, properties, type, item) => {
  for (let i = 0; i < properties.length; i++) {
    if (properties[i] in obj && type === 'array') {
      obj[properties[i]].push(item);
    } else if (properties[i] in obj && type === 'object') {
      recursiveClassify(obj[properties[i]], [item.product], 'array', item);
    } else {
      obj[properties[i]] = type === 'object' ? {} : [];
      recursiveClassify(obj, [properties[i]], type, item);
    }
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      selection: 'All',
      denomination: 1000000,
    };
    this.inputSelection = this.inputSelection.bind(this);
  }

  componentDidMount() {
    axios.get('/api')
      .then((response) => {
        const data = {};
        response.data.forEach(item => recursiveClassify(data, [item.year, 'All'], 'object', item));
        this.setState({ 
          data,
          selection: Object.keys(data)[0],
        });
      })
      .catch(err => console.log(err));
  }

  inputSelection(e) {
    this.setState({ selection: e.target.value });
  }

  updateData(year, product, values) {
    const dataCopy = this.state.data;
    dataCopy[year][product] = values;
    this.setState({
      data: dataCopy,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="dropdownWrapper">
          <h4>
            Fiscal Year
          </h4>
          <select onChange={this.inputSelection} value={this.state.selection}>
            {Object.keys(this.state.data).map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <Chart data={this.state.data[this.state.selection] || {}} selection={this.state.selection} classify={recursiveClassify} updateData={this.updateData.bind(this)} denomination={this.state.denomination} />
      </div>
    );
  }
}
