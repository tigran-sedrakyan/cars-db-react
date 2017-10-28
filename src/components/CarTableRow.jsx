import React, {Component} from 'react';
import {ControlLabel, Modal, Button, Form, FormControl, FormGroup} from 'react-bootstrap';
import {connect} from 'react-redux';
import {editData, deleteData} from '../actions';

class CarTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.props.info['_links'].self.href,
      showDeleteModal: false,
      showEditModal: false,
      data: []
    }
  }

  delete_data () {
    this.props.deleteData(this.state.link)
    this.props.get_data()
  }

  edit_data() {
    let data = this.state.data;
    for (let i = 0; i < 4; i++) {
      if (data[i] === "") {
        data[i] = undefined;
      }
    }
    var data_obj = {
        "registrationNumber": data[0],
        "productionDate": data[1],
        "company": data[2],
        "model": data[3]
    }

    this.props.editData(this.state.link, data_obj);
    this.props.get_data();
  }

  render() {
    return(
      <tr>
        <td>{this.props.info['registrationNumber']}</td>
        <td>{this.props.info['productionDate']}</td>
        <td>{this.props.info['company']}</td>
        <td>{this.props.info['model']}</td>
        <td>
          <div>
            <Button bsStyle = "danger" onClick = {() => this.setState({showDeleteModal: true})}>Delete</Button>
            <Button bsStyle = "primary" onClick = {() => this.setState({showEditModal: true})}>Edit</Button>
            <Modal show={this.state.showDeleteModal} onHide={() => this.setState({ showDeleteModal: false })}>
              <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Do you really want to delete this entry? This can't be undone!
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle = "success" onClick = {() => {
                  this.setState({showDeleteModal:false})
                  this.delete_data();
                  this.props.get_data();
                }
              } > Yes </Button>
                <Button bsStyle = "danger" onClick={ ()=> this.setState({ showDeleteModal: false })}> No </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={this.state.showEditModal} onHide={() => this.setState({ showEditModal: false })}>
              <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form>
                <FormGroup>
                  <ControlLabel>Registration Number </ControlLabel>
                  <FormControl
                    defaultValue = {this.props.info['registrationNumber']}
                    type="text"
                    onChange = {event => {
                      let data = [ ...this.state.data ];
                      data[0] = event.target.value;
                      this.setState({ data: data });
                    }}
                    placeholder="Registration Number"
                  />
                  <ControlLabel>Production Date</ControlLabel>
                  <FormControl
                    defaultValue = {this.props.info['productionDate']}
                    type="text"
                    onChange = {event => {
                      let data = [ ...this.state.data];
                      data[1] = event.target.value;
                      this.setState({ data: data });
                    }
                  }
                    placeholder="Production date"
                  />
                  <ControlLabel>Company </ControlLabel>

                  <FormControl
                    defaultValue = {this.props.info['company']}
                    type="text"
                    onChange = {event => {
                      let data = [ ...this.state.data];
                      data[2] = event.target.value;
                      this.setState({ data: data });
                    }
                  }
                    placeholder="Company"
                  />
                  <ControlLabel>Model </ControlLabel>

                  <FormControl
                  defaultValue = {this.props.info['model']}
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
                  this.edit_data();
                  this.props.get_data()
                  this.setState({showEditModal:false})
                }
              } > Save </Button>
                <Button bsStyle = "danger" onClick={ ()=> this.setState({ showEditModal: false })}> Cancel </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </td>
      </tr>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    cars: state
  }
}

export default connect (mapStateToProps, {editData, deleteData}) (CarTableRow);
