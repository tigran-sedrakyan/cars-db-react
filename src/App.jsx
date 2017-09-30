import React, {Component} from 'react';
import url from './config';

import {Form, FormControl, Button, Table, Collapse, FormGroup} from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super (props);
    this.state = {
      open : false,
      cars : [],
      url: url,
      data: [],
      links: []
    }
  }

  componentWillMount() {
      fetch(this.state.url, {
        method: "GET"
      }).then (res => {
        return res.json();
      }).then (data => {
        let cars = data._embedded.cars
        this.setState({cars: cars})
        let table = document.getElementById('t-body');
        for (let i = 0; i < cars.length; i++) {
              const info = [];
              Object.keys(cars[i]).forEach(function (key) {
                let obj = cars[i][key];
                info.push(obj);
              });
              let tr = document.createElement("tr");
              for (let j = 0; j < info.length; j++) {
                let td = document.createElement("td");
                if (j === info.length - 1) {
                  let data = [ ...this.state.links ];
                  data[i] = info[j].self.href;
                  this.setState({links:data})
                  let but1 = document.createElement("button");
                  let but2 = document.createElement("button");
                  but1.className = "btn btn-danger delete_button"
                  but2.className = "btn btn-primary edit_button"
                  but1.onclick = () => this.delete_data(i);
                  but2.onclick = () => this.edit_data(i)
                  let t1 = document.createTextNode("Delete")
                  let t2 = document.createTextNode("Edit")
                  but1.appendChild(t1)
                  but2.appendChild(t2)

                  let div = document.createElement("div")
                  div.appendChild(but1)
                  div.appendChild(but2)
                  td.appendChild(div)
                }
                else {
                  let text = document.createTextNode(info[j]);
                  td.appendChild(text);
                }
            tr.appendChild(td)
            tr.id = i;
            table.appendChild(tr)
          }
        }
      })
  }

  send_data () {
    let data = this.state.data
    var data_obj = {
      "registrationNumber": data[0],
      "productionDate": data[1],
      "company": data[2],
      "model": data[3]
    };
    console.log(data_obj);
    fetch(this.state.url,
    {
      method: "POST",
      body: JSON.stringify(data_obj),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then( () => {
      window.location.reload();
    })
  }

  delete_data (i) {
      console.log(i);
      fetch(this.state.links[i], {
            "method" : "DELETE"
          }).then( () => {
            window.location.reload()
          })
  }

  edit_data(i) {
    // TODO: add edit functionality
  }

  render() {
    return (
      <div>
        <Button bsStyle = "primary" onClick={ ()=> this.setState({ open: !this.state.open })}>
          Add Entry
        </Button>
        <Collapse in={this.state.open}>
          <Form>
            <FormGroup controlId="formBasicText">
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
              <Button bsStyle = "success" onClick = {() => this.send_data()}> Submit </Button>
              <Button bsStyle = "danger" onClick={ ()=> this.setState({ open: !this.state.open })}> Cancel </Button>
          </Form>
        </Collapse>

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
          <tbody id="t-body"></tbody>
      </Table>
    </div>
    )
  }
}

export default App
