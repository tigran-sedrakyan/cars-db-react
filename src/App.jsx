import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import CarTable from './CarTable';
import url from './config';

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
    fetch(this.state.url, {
      method: "GET"
    }).then (res => {
      return res.json();
    }).then(data => {
      let cars = data._embedded.cars
      this.setState({cars: cars})
    })
  }

  componentWillMount() {
      this.get_data()
  }


  send_data () {
    let data = this.state.data
    var data_obj = {
      "registrationNumber": data[0],
      "productionDate": data[1],
      "company": data[2],
      "model": data[3]
    };
    fetch(this.state.url,
    {
      method: "POST",
      body: JSON.stringify(data_obj),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then( () => {
      this.get_data()
    })
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
              <FormControl
                type="text"
                onChange = {event => {
                  let data = [ ...this.state.data ];
                  data[0] = event.target.value;
                  this.setState({ data: data });
                }}
                placeholder="Registration Number"
              />
              <FormControl
                type="text"
                onChange = {event => {
                  let data = [ ...this.state.data];
                  data[1] = event.target.value;
                  this.setState({ data: data });
                }
              }
                placeholder="Production date"
              />
              <FormControl
                type="text"
                onChange = {event => {
                  let data = [ ...this.state.data];
                  data[2] = event.target.value;
                  this.setState({ data: data });
                }
              }
                placeholder="Company"
              />
              <FormControl
                type="text"
                onChange = {event => {
                  let data = [ ...this.state.data];
                  data[3] = event.target.value;
                  this.setState({ data: data });
                }
              }
                placeholder="Model"
              />

            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle = "success" onClick = {() => {
            this.send_data();
            this.setState({showModal:false})
          }
        } > Submit </Button>
          <Button bsStyle = "danger" onClick={ ()=> this.setState({ showModal: false })}> Cancel </Button>
        </Modal.Footer>
      </Modal>

        <CarTable get_data = {this.get_data.bind(this)} cars = {this.state.cars}></CarTable>
    </div>
    )
  }
}

export default App
