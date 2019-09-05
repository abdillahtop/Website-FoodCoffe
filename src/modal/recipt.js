import React, { Component } from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Col
} from 'reactstrap'
import './index.css'
import Swal from 'sweetalert2'

export default class Recipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            books: [],
            loanings: []

        };
        this.toggle = this.toggle.bind(this);
        this.addLoaning = this.addLoaning.bind(this);
    }

    componentDidMount = async () => {
        await this.props.dispatch(getLoaning())
        this.setState({
            books: this.props.book
        })
    }

    addLoaning(bookid, no_ktp, name) {
        this.props.dispatch(postLoaning(bookid, no_ktp, name))
        this.setState({
            loanings: this.props.loaning
        })
        if (this.state.bookid === undefined | this.state.no_ktp === undefined | this.state.name === undefined) {
            Swal.fire({
                title: 'Buku Belum dapat dipinjam',
                type: 'error',
                html: '<b> Pastikan data yang anda inputkan benar </b>'
            })
        } else {
            Swal.fire({
                title: 'Buku Berhasil dipinjam!',
                type: 'success',
                html: '<b>Selamat membaca sahabat, semoga bermanfaat!/b>',
            }).then(() => {
                this.toggle()
            })
        }
    }

    toggle() {
        console.log("salam dari toogle :", this.props.data ? this.props.data.book_name : '')
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    }

    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                <div {...this.props}>
                    <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>

                        <ModalHeader toggle={this.toggle}>Recipt</ModalHeader>
                        <ModalBody>
                            
                        </ModalBody>
                        <ModalFooter>
                            <button className="buttonSave" color="warning" >Save</button>{' '}
                        </ModalFooter>
                    </Modal>
                </div>
            </div >
        );
    }
}