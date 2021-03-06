import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col
} from 'reactstrap'
import {connect} from 'react-redux'
import {Redirect,Link } from 'react-router-dom'
import swal from 'sweetalert2'
import {postLogin} from '../public/redux/action/user'
import '../App.css';
const localdata = JSON.parse(localStorage.getItem('Data')) || ''

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  isLogin(data){
    const {email, password} = this.state
    if( email==='' || password=== ''){
      swal.fire({
        title: 'Masukkan Email & Password',
        type: 'warning',
      })
    }else{
     this.props.dispatch(postLogin(data))
      .then(() => {
        swal.fire({
          title: 'Berhasil Login',
          type: 'success',
        })
      })
      .catch(() => {
        swal.fire({
          title: 'Gagal Login',
          type: 'warning',
        })
      })
    }
  }

  handleInputChange(e) {
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { email, password,redirect } =this.state
    let data={
      email: email,
      password: password
    }
    return (
      <div className="App-header">
        <div style={{ width: '50%' }}>
          <div style={{ textAlign: 'center', fontSize: 40 }}>
            <text style={{ color: '#000',fontWeight: 900 }}>Login Cashier </text>
          </div>
          <Form>
            <FormGroup >
              <Label style={{ color: '#000' }} sm={3}>Email</Label>
              <Col sm={12}>
                <Input
                  type="text"
                  name="email"
                  placeholder="Email.."
                  bsSize="lg"
                  onChange={this.handleInputChange} value={email} />
              </Col>
            </FormGroup>
            <FormGroup >
              <Label style={{ color: '#000' }} sm={3}>Password</Label>
              <Col sm={12}>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password.."
                  bsSize="lg"
                  onChange={this.handleInputChange} value={password} />
              </Col>
            </FormGroup>
            <Row style={{ justifyContent:'center', alignItems:'center'}}>
              <div style={{width:'92%', }}>
           <Link to={'/home'}> <Button style={{ background: "#F24F8A", borderWidth: '0', width:'100%' }} size='lg' block onClick={()=>this.isLogin(data)}>Login</Button>{' '}</Link></div>
            </Row>
          </Form>
      </div>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps)(Login);