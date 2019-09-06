import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Modal,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Badge,
  Input,
  Row,
  Col
} from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import swal from 'sweetalert2'
import {Link, Redirect} from 'react-router-dom'
import api from '../config/api'
import Recipt from '../modal/recipt'
const axios = require('axios');
const localdata = JSON.parse(localStorage.getItem('Data')) || ''

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      modal: false,
      loading: false,
      home:false,
      image: null,
      logout:false,
      menu: '',
      idCat: 1,
      price: 0,
      total: 0,
      selectAll: [],
      selected: [],
      data: [],
      category: [],
      tampung: [],
      tampungtotal: [],
      idTransaction: 0,
      quanty: 1
    };
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onChangeFile = this.onChangeFile.bind(this)
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentDidMount() {
    this.getMenu()
   this.getIdRecipt()
    this.getCategory()
  }

  minus() {
    const minus = this.state.quanty - 1
    this.setState({
      quanty: minus
    })
  }

  plus() {
    const plus = this.state.quanty + 1
    this.setState({
      quanty: plus
    })
  }

  getMenu() {
    axios.get(`${api}menu`)
      .then(result => {
        // console.log("resuslt", result.data.result)
        this.setState({
          data: result.data.result,
          loading: false
        })
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  getIdRecipt() {
    // console.log("id_user",localdata.id_user)
    axios.get(`${api}history/`)
      .then(result => {
        // console.log("resuslt", result.data.result[0].id_history)
        this.setState({
          idTransaction: result.data.result[0].id_history
         
        })
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  isLogout= async() => {
    // console.log("id_user",localdata.id_user)
    const idUser = localdata.id_user
    axios.post(`${api}user/logout/${idUser}`)
      .then( async (result) => {
        // console.log("resuslt", result.data.result[0].id_history)
        
        swal.fire({
          title: 'Berhasil Logout',
          type: 'success',
        })
        await localStorage.clear()
      })
      .catch(error => {
        console.log("error", error)
        swal.fire({
          title: 'Gagal Logout',
          type: 'error',
        })
      })
  }

  selectItem(item) {
    //  console.log("adakah",item)
    this.state.selected.push(item)
    this.state.tampung.push(item.price)
    this.setState({
      selectAll: this.state.selected,
      tampungtotal: this.state.tampung
    })
  }

  getCategory() {
    axios.get(`${api}category`)
      .then(result => {
        // console.log("resuslt", result.data.result)
        this.setState({
          category: result.data.result
        })
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  formatRupiah(angka, prefix){
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

    if(ribuan){
      let separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
  }

  newMenu = async () => {
    const { image, menu, price, idCat } = this.state
    // console.log("idCat picker", idCat)
    // console.log("menu picker", menu)
    // console.log("image picker", image)
    // console.log("price picker", price)
    if (menu === '' || image === '' || idCat === 0 || price === 0) {
      swal.fire({
        title: 'Add MenuFailed',
        type: 'warning',
        text: 'Failed add data, please fill the blank form correctly!'
      })
    } else {
      let formdata = new FormData()
      formdata.append('nameMenu', menu)
      formdata.append('idCat', idCat)
      formdata.append('image', image)
      formdata.append('price', price)

      await axios.post(`${api}menu`, formdata)
        .then(() => {
          this.toggle()
          swal.fire({
            title: 'Add Menu Success',
            type: 'success',
            text: 'Data added successfully!',
          })
          
        })
        .catch(() => {
          swal.fire({
            title: 'Add Menu Failed',
            type: 'warning',
            text: 'Title does exist!',
          })
        })
        
    }

  }

  _total() {
    let total = this.state.tampungtotal.length > 0 && this.state.tampungtotal.reduce((item2, item3) => {
      return (parseInt(item2) + parseInt(item3))

    })
    this.state.total = total
    //  console.log("total", total)
  }

  handleInputChange(e) {
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  onChangeFile = (e) => {
    console.log(e.target.files[0])
    this.setState({
      image: e.target.files[0],
      loaded: 0,
    })
  }


  cancel() {
    this.setState({
      selectAll: this.state.selectAll.length = 0,
      tampungtotal: this.state.tampungtotal.length = 0,
    })
  }


  render() {

    const { menu, price, idCat, selectAll,logout,home } = this.state
    // console.log("idCat picker", idCat)
    // console.log("menu picker", menu)
    // console.log("image picker", image)
    // console.log("price picker", price)
    console.log("select", selectAll)
    console.log("tampung", this.state.tampungtotal)
    this._total()
    // if (logout) {
    //   return <Redirect to='/'/>;
    // } else
    // if (home) {
    //   return <Redirect to='/home'/>;
    // }
    return (
      <div style={{ overflowX: 'hidden' }}>
        <Row>
          <Col xs="8" >
            <Navbar light color="#fff" style={{ boxShadow: '-5px 2px 5px rgba(0, 0, 0, 0.25)', height: 60 }} expand="lg">
              <i className="fa fa-bars fa-2x ml-2"></i>
              <NavbarBrand className="ml-auto" style={{ fontWeight: '700', fontSize: 30 }}>FoodItems</NavbarBrand>
              <i className="fa fa-search fa-2x ml-auto"></i>
            </Navbar>
            <Row >
              <Col xs="1" style={{ backgroundColor: '#fff', height: 'auto', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)' }}>
                <Link to={'/home'}> <img style={{ marginLeft: 15, marginTop: 20, marginBottom: 20, width: 30 }}  src={require('../assets/fork.png')} /> </Link>
               <Link to={'/history'}> <img style={{ marginLeft: 15, marginTop: 20, marginBottom: 20, width: 30 }} src={require('../assets/clipboard.png')} /></Link>
               <img style={{ marginLeft: 15, marginTop: 20, marginBottom: 20, width: 30 }} onClick={this.toggle} src={require('../assets/add.png')} />
              <Link to={'/'}>  <i style={{marginTop: 10, marginLeft: 18}} onClick={() => this.isLogout()} class="fa fa-sign-out fa-2x"></i></Link> 
              </Col>
              <Col xs='11'>
                <Row style={{ padding: 30, width: "102%", height: 590, overflowX: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                  {
                    this.state.data.map(item => {
                      return (

                        <div className="Col md-8 ">
                          <div onClick={() => this.selectItem(item)}>
                            <img style={{ width: 230, height: 180, marginRight: 10, marginLeft: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} src={item.image} alt="..." />
                            <div style={{ marginLeft: 20 }}>
                              <p style={{ fontSize: 20 }}>{item.name_menu}</p  >
                              <h5 style={{ fontWeight: 600, fontSize: 20, marginTop: -20, marginBottom: 20 }}>Rp. {this.formatRupiah(item.price)}</h5>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs='4' style={{ marginLeft: -30, width: '100%' }}>
            <Navbar light color="#fff" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', justifyContent: 'center', alignItems: 'center', height: 60 }} expand="lg">
              <NavbarBrand className="center" style={{ fontWeight: '600', fontSize: 26 }}>Card<Badge color="primary">{selectAll.length}</Badge></NavbarBrand>
            </Navbar>

            {
              this.state.selectAll[0]
                ?
                <>
                  <Row style={{ justifyContent: 'center', height: 420, overflowX: 'hidden' }}>
                    {

                      this.state.selectAll.map((item1, index1) => {

                        return (
                          <>
                            <Row sm="12" >
                              <Col md='4' className="ml-3">
                                <img style={{ marginLeft: 15, marginTop: 20, width: 100, height: 100 }} src={item1.image} />
                              </Col>
                              <Col md="4" style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                                <Row>
                                  <h5 style={{ textAlign: 'left' }}>{item1.name_menu}</h5>
                                </Row>
                                <Row style={{ marginLeft: -30 }}>
                                  <Col md='1'>
                                    <Button onClick={() => this.minus()} color="success" size="sm">-</Button>
                                  </Col>
                                  <Col md='5'>
                                    <Input style={{ height: 30 }} name="quanty" value={this.state.quanty} />
                                  </Col>
                                  <Col md='1' style={{ marginLeft: -20 }}>
                                    <Button onClick={() => this.plus()} color="success" size="sm">+</Button>
                                  </Col>
                                </Row>
                              </Col>
                              <Col md='3' style={{ marginLeft: -40, marginTop: 80 }}>
                                <h6>Rp. {this.formatRupiah(item1.price) }</h6>
                              </Col>
                            </Row>
                          </>
                        )
                      })
                    }
                  </Row>
                  <Row style={{ paddingRight: 30, paddingLeft: 30 }}>
                    <Col md='8' style={{ marginBottom: -20, marginTop: 5 }}>
                      <h5 style={{ marginBottom: -10 }}>Total :</h5>
                    </Col>
                    <Col md="4" style={{ marginBottom: -20 }}>
                      <h5 style={{ marginBottom: -10 }}>Rp. {this.state.total}</h5>
                    </Col>

                    <p style={{ width: '100%', paddingLeft: 20, paddingTop: 20, marginTop: 5, marginBottom: 0 }}>*Belum Termasuk PPN</p>
                    <div style={{ width: '100%', marginBottom: 10, marginTop: 10 }}>
                      <Recipt size="lg" block data={this.state.selectAll} total={this.state.total} idTransaction={this.state.idTransaction+1} dataCashier={localdata}/>
                    </div>
                    <Button style={{ color: '#fff', background: "#F24F8A", borderWidth: '0' }} onClick={() => this.cancel()} size="lg" block>Cancel</Button>
                  </Row>
                </>
                :
                <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    <img style={{ marginLeft: 15, marginTop: 20, width: 250 }} src={require('../assets/food.png')} />
                  </div>
                  <div style={{ width: '100&', textAlign: 'center', marginTop: -30 }}>
                    <h3 style={{ width: 900 }}>Your Cart is Empty</h3 >
                  </div>
                  <div style={{ width: '100&', textAlign: 'center' }}>
                    <p style={{ fontSize: 20, color: '#CECECE' }}>Please add some item from the menu</p>
                  </div>
                </Row>
            }
          </Col>
        </Row>
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
          <div style={{ padding: 20 }}>
            <h3>ADD MENU</h3>
          </div>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label sm={3} size="lg">Nama</Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    name="menu"
                    placeholder="Menu name.."
                    bsSize="lg"
                    onChange={this.handleInputChange} value={menu} />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3} size="lg">Image</Label>
                <Col sm={9}>
                  <Input
                    type="file"
                    name="writter"
                    placeholder="Writter.."
                    bsSize="lg"
                    onChange={this.onChangeFile} />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3} size="lg">Price</Label>
                <Col sm={9}>
                  <Input
                    type="number"
                    name="price"
                    placeholder="Price.."
                    bsSize="lg"
                    onChange={this.handleInputChange} value={price} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3} size="lg">Category</Label>
                <Col sm={9}>
                  <select name="idCat" value={idCat} onChange={this.handleInputChange}>
                    {
                      this.state.category.map((item1, key) => {
                        return (
                          <option key={key} value={item1.id_category}>{item1.name_category}</option>
                        )
                      })
                    }
                  </select>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <Row style={{ flexDirection: 'row', padding: 20 }}>
            <Col md={{ size: 3, offset: 6 }} >
              <Button style={{ background: "#F24F8A", borderWidth: '0' }}  block onClick={this.toggle}>Cancel</Button>{' '}
            </Col>
            <Col>
              <Link to={'/home'}> <Button style={{ background: "#57CAD5", borderWidth: '0' }} block onClick={() => this.newMenu()}>Add</Button></Link>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default Home;