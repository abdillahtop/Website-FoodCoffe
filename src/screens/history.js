import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Table,
  Row,
  Spinner,
  Col,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import api from '../config/api'
import {Link} from 'react-router-dom'
const axios = require('axios');
const localdata = JSON.parse(localStorage.getItem('Data')) || ''

class History extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dropdownOpen: false,
      select: 1,
      loading:true
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.getHistory()
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  getHistory() {
    console.log("id_user",localdata.id_user)
    const idUser = localdata.id_user
    axios.get(`${api}history/${idUser}`)
      .then(result => {
        console.log("resuslt", result.data.result)
        this.setState({
          data: result.data.result,
          select: 1,
          loading:false

        })
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  getHistoryDay() {
    // console.log("id_user",localdata.id_user)
    const idUser = localdata.id_user
    axios.get(`${api}history/day/${idUser}`)
      .then(result => {
        console.log("resuslt", result.data.result)
        this.setState({
          data: result.data.result,
          select: 2,
          loading:false

        })
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  getHistoryWeek() {
    // console.log("id_user",localdata.id_user)
    const idUser = localdata.id_user
    axios.get(`${api}history/week/${idUser}`)
      .then(result => {
        console.log("resuslt", result.data.result)
        this.setState({
          data: result.data.result,
          select: 3,
          loading:false
        })
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  getHistoryMonth() {
    // console.log("id_user",localdata.id_user)
    const idUser = localdata.id_user
    axios.get(`${api}history/month/${idUser}`)
      .then(result => {
        console.log("resuslt", result.data.result)
        this.setState({
          data: result.data.result,
          select: 4,
          loading:false
        })
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  getHistoryYear() {
    // console.log("id_user",localdata.id_user)
    const idUser = localdata.id_user
    axios.get(`${api}history/year/${idUser}`)
      .then(result => {
        console.log("resuslt", result.data.result)
        this.setState({
          data: result.data.result,
          select: 5,
          loading:false
        })
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  formatDate(date) {
    let data = Date.parse(date);
    let newDate = new Date(data);
    let day = newDate.getDate();
    let months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    let month = months[newDate.getMonth()];
    let year = newDate.getFullYear();
    return `${day} ${month} ${year}`
  }

  render() {

    return (
      <div style={{ overflowX: 'hidden' }}>
        <Row>
          <Col xs="12" >
            <Navbar light color="#fff" style={{ boxShadow: '-5px 2px 5px rgba(0, 0, 0, 0.25)', height: 60 }} expand="lg">
              <i className="fa fa-bars fa-2x ml-2"></i>
              <NavbarBrand className="mr-auto ml-auto" style={{ fontWeight: '700', fontSize: 30 }}>History</NavbarBrand>
              <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                  Sort By
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.getHistory()}>All</DropdownItem>
                  <DropdownItem onClick={() => this.getHistoryDay()}>Day</DropdownItem>
                  <DropdownItem onClick={() => this.getHistoryWeek()}>Week</DropdownItem>
                  <DropdownItem onClick={() => this.getHistoryMonth()}>Month</DropdownItem>
                  <DropdownItem onClick={() => this.getHistoryYear()}>Year</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </Navbar>
            <Row >
              <Col xs="1" style={{ backgroundColor: '#fff', height: 'auto', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)' }}>
              <Link to={'/home'} ><img style={{ marginLeft: 15, marginTop: 20, marginBottom: 20, width: 30 }} src={require('../assets/fork.png')} /></Link>
              <Link to={'/history'}><img style={{ marginLeft: 15, marginTop: 20, marginBottom: 20, width: 30 }} src={require('../assets/clipboard.png')} /></Link>  

              </Col>
              <Col xs='11'>
                <Table>
                  <thead>
                    <tr>
                      <th>Number</th>
                      <th>Receipt Id</th>
                      <th>Date</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        this.state.loading
                        ?
                        <div className="App-loading">
                        <Spinner color="primary"  />
                        </div>
                        :
                      this.state.data.map((item, key) => {
                        return (
                          <tr>
                            <th scope="row">{key + 1}</th>
                            <td>{item.id_history}</td>
                            {
                              this.state.select !== 1
                                ?
                                <td>{item.created_at}</td>
                                :
                                <td>{this.formatDate(item.created_at)}</td>
                            }
                            <td>{item.total}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default History;