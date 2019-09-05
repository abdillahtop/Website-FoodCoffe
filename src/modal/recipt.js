import React from 'react';
import { Button, Modal, ModalBody, Row, Col } from 'reactstrap';
import axios from 'axios'
import swal from 'sweetalert2'

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            data: this.props.data,
            dataCashier: this.props.dataCashier,
            idTransaction: this.props.idTransaction,

        };

        this.toggle = this.toggle.bind(this);
    }

    newHistory(data){
        axios.post('https://foodcoffe.herokuapp.com/history',data)
        .then(() => {
            swal.fire({
                title: 'Transaksi Berhasil',
                type: 'success',
                text: 'Silahkan Cek Bukti Transaksi',
              },
                window.location.href='/home'
              )
              this.toggle()
        })
        .catch(()=>{
            swal.fire({
                title: 'Transaksi Gagal',
                type: 'error',
                text: 'Ada Gangguan dalam Sistem Kami!, Hubungi Penyedia layanan anda',
              },
                window.location.href='/home'
              )
        })
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
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

    render() {
        console.log("props ini", this.props.data)
        console.log("idtransaction", this.props.idTransaction)
        const { idTransaction,  data, dataCashier} = this.state
        let dataHistory = {
            idCashier : dataCashier.id_user,
            total: this.props.total+this.props.total/100*10
        }
        return (
            <div>
                <Button style={{ color: '#fff', background: "#57CAD5", borderWidth: '0', width: '100%' }} size="lg" block onClick={this.toggle}>Checkout</Button>
                {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
                <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
                    <Row style={{ padding: 20 }}>
                        <Col>
                            <h5>Receipt</h5>
                            <h6>Cashier : {dataCashier.name_user}</h6>
                        </Col>
                        <Col md={{ size: 5, offset: 2 }}>
                            <h5>Receipt No {idTransaction}</h5>
                        </Col>
                    </Row>
                    <ModalBody>
                        {
                            data.map((item, index) => {
                                // console.log("dari recipt",item.name_menu)
                                return (
                                    <>
                                        <Row style={{ marginLeft: 20 }}>
                                            <Col md={{ size: 5 }}>
                                                <h6>{item.name_menu}</h6>
                                            </Col>
                                            <Col md={{ size: 4, offset: 3 }}>
                                                <h6>Rp. {this.formatRupiah(item.price)}</h6>
                                            </Col>
                                        </Row>
                                    </>
                                )
                            })
                        }
                        <Row style={{ marginLeft: 20 }}>
                            <Col md={{ size: 5 }}>
                                <h6>Ppn 10%</h6>
                            </Col>
                            <Col md={{ size: 4, offset: 3 }}>
                                <h6>Rp. {this.props.total/100*10}</h6>
                            </Col>
                        </Row>
                        <Row style={{ marginLeft: -10 }}>
                            <Col md={{ size: 5, offset: 7 }}>
                                <h6>Total : Rp. {this.props.total+this.props.total/100*10}</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ offset: 1 }}>
                            <h6>Payment : Cash</h6>
                            </Col>
                        </Row>
                    </ModalBody>
                    <Row style={{paddingLeft: 40, paddingRight:40, justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                        <Button style={{ background: "#F24F8A", borderWidth: '0' }} onClick={()=>this.newHistory(dataHistory)}  block>Print</Button>{' '}
                        <h6 >Or</h6>
                        <Button style={{ background: "#57CAD5", borderWidth: '0' }} onClick={this.toggle} block>Send Email</Button>
                    </Row>
                </Modal>
            </div>
        );
    }
}

export default ModalExample;