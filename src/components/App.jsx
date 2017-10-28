import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import CarTable from './CarTable';
import url from '../config';
import _ from 'lodash';
import {connect} from 'react-redux';
import {getData, sendData} from '../actions';

import {Form, FormControl, Button, FormGroup} from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super (props);
    this.state = {
      showModal: false,
      cars : [],
      url: url,
      data: [],
      links: []
    }
  }

  get_data() {
    this.props.getData()
  }

  send_data () {
    let data = this.state.data
    if (!(_.isEmpty(data))) {
      var data_obj = {
        "registrationNumber": data[0],
        "productionDate": data[1],
        "company": data[2],
        "model": data[3]
      };
      this.props.sendData(data_obj);
      this.get_data();
      this.setState({data: []});
    }
  }

  componentWillMount() {
      this.get_data()
  }

  render() {
    return (
      <div>
      <Button
        bsStyle="primary"
        bsSize="large"
        onClick={() => this.setState({ showModal: true })}
      >
        Add Entry
      </Button>
      <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
        <Modal.Header closeButton>
          <Modal.Title>Add Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              {["Registration Number", "Production date", "Company", "Model"].map((placeholder, index) => {
                return (
                  <FormControl key = {index}
                    type="text"
                    onChange = {event => {
                      let data = [ ...this.state.data ];
                      data[index] = event.target.value;
                      this.setState({ data: data });
                    }}
                    placeholder = {placeholder}
                  />
                  )
              })}
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle = "success" onClick = {() => {
            this.send_data();
            this.get_data();
            this.setState({showModal:false})
          }
        } > Submit </Button>
          <Button bsStyle = "danger" onClick={ ()=> this.setState({ showModal: false })}> Cancel </Button>
        </Modal.Footer>
      </Modal>
        <CarTable get_data = {this.get_data.bind(this)} cars = {this.props.cars}></CarTable>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cars: state
  }
}

export default connect (mapStateToProps, {getData, sendData}) (App);
