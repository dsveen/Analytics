import React, { Component } from 'react';

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataByRegion: [],
      average: 0,
    };
    this.revenueChange = this.revenueChange.bind(this);
    this.updateChart = this.updateChart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const dataByRegion = Object.keys(nextProps.gridData).map(region => nextProps.gridData[region][nextProps.product].reduce((acc, curr) => acc + curr.revenue / this.props.denomination, 0));
    const average = dataByRegion.reduce((acc, curr) => acc + curr, 0) / dataByRegion.length;
    this.setState({
      dataByRegion,
      average,
    });
  }

  revenueChange(e) {
    const dataByRegionCopy = this.state.dataByRegion;
    dataByRegionCopy[e.target.getAttribute('index')] = parseInt(e.target.value);
    this.setState({ dataByRegion: dataByRegionCopy });
  }

  updateChart(e) {
    e.preventDefault();
    this.props.updateData(
      this.props.year,
      this.props.product,
      this.state.dataByRegion.map((revByRegion, i) => ({
        country: Object.keys(this.props.gridData)[i],
        id: 1,
        product: this.props.product,
        revenue: revByRegion * this.props.denomination,
        year: this.props.year,
      })),
    );
  }

  render() {
    return (
      <div className="gridWrapper" style={{ visibility: this.props.show ? 'visible' : 'hidden' }}>
        <h4>
          Revenue Report,{' ' + this.props.year + ', ' + this.props.product}
        </h4>
        <form onSubmit={this.updateChart}>
          <table>
            <tbody>
              <tr>
                <th>
                  Fiscal Year
                </th>
                <th>
                  Product
                </th>
                <th>
                  Region
                </th>
                <th>
                  Revenue
                </th>
              </tr>
              {this.state.dataByRegion.map((revByRegion, i) => (
                <tr key={Object.keys(this.props.gridData)[i]}>
                  <td>
                    {this.props.year}
                  </td>
                  <td>
                    {this.props.product}
                  </td>
                  <td>
                    {Object.keys(this.props.gridData)[i]}
                  </td>
                  <td style={{ fontWeight: revByRegion < this.state.average ? 'bold' : 'normal' }}>
                    $
                    <input className="tableInput" step="any" type="number" index={i} value={Math.round(revByRegion * 10) / 10} style={{ fontWeight: revByRegion < this.state.average ? 'bold' : 'normal' }} onChange={this.revenueChange} />
                    M
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <input className="submit" type="submit" value="Update Chart" />
        </form>
      </div>
    );
  }
}
