import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import CarTableRow from './CarTableRow';

class CarTable extends Component {

  render() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Registration Number</th>
            <th>Production Date</th>
            <th>Company</th>
            <th>Model</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody id="t-body">
          {this.props.cars.map((entry, i) => {
            return <CarTableRow get_data = {this.props.get_data} key = {i} info = {entry}></CarTableRow>
          })}
        </tbody>
    </Table>
    )
  }
}

export default CarTable;
