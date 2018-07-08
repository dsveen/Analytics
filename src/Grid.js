import React, { Component } from 'react';

export default class Grid extends Component {
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Fiscal Year</th>
              <th>Product</th>
              <th>Region</th>
              <th>Revenue</th>
            </tr>
            {Object.keys(this.props.gridData).map(country =>
              <tr key={country}>
                <td>{this.props.year}</td>
                <td>{this.props.product}</td>
                <td>{country}</td>
                <td>{'$' + (this.props.gridData[country][this.props.product].reduce((acc, curr) => {
                  return acc + curr.revenue/1000000;
                  }, 0)).toFixed(1) + 'M'}
                </td>
              </tr>,
            )}
          </tbody>
        </table>
      </div>
    );
  }
}