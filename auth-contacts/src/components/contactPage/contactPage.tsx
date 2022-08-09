import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './modal/modal';

import '../app/app.scss';

type Contact = {
    id: number,
    login: string,
    password: string,
    name: string,
    number: string
}

type DataState = {
    contacts: Array<Contact>,
    modalData: Contact,
    modalOpen: boolean,
}

class ContactPage extends Component {

    state: DataState = {
        contacts: [],
        modalData: null,
        modalOpen: false 
    };

    props: any; // поправить
    
    componentDidMount(): void {
        fetch('http://localhost:3001/contactDeps')
        .then(res => res.json())
        .then(data => data.find((el: Contact) => 
        {
            return el.login == this.props.userInfo.login && el.password == this.props.userInfo.password
        }))
        .then((filtered) => this.setState({
            contacts: filtered.contacts
        }))
    }

    openModal = (data?: Contact): void => {
        this.setState({
            modalData: data,
            modalOpen: true
        })
    }

    changeContact = (e: React.FormEvent<EventTarget>): void => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        const name: string = target['contactName'].value;
        const number: string = target['telNum'].value;

        this.setState({
            contacts: [
                ...this.state.contacts.slice(0, this.state.modalData.id),
                {
                    id: this.state.modalData.id, name, number
                },
                ...this.state.contacts.slice(this.state.modalData.id + 1)
            ]
        });

        this.closeModal();
    }

    closeModal = (): void => {
        this.setState({
            modalOpen: false
        })
    }

    addContact = (e: React.FormEvent<EventTarget>): void => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        const name: string = target['contactName'].value;
        const number: string = target['telNum'].value;
        this.setState({
            contacts: [
                ...this.state.contacts,
                {
                    name, number
                }
            ]
        });

        this.closeModal();
    }

    render() {
        return (
            <section>
                <div className='flexbox align-right base-padding'>
                    {this.props.userInfo.login}<br/>
                </div>
                <div className='flexbox base-padding margin-bottom-big'>
                    <h1>Контакты</h1>
                    <i className="fa fa-plus flexbox align-center" aria-hidden="true" onClick={() => this.openModal()}></i>
                </div>

                { this.state.modalOpen ? 
                    <Modal 
                        addContact={this.addContact} 
                        closeModal={this.closeModal} 
                        modalData={this.state.modalData}
                        changeContact={this.changeContact}/> : <></>
                }

                <div className='base-padding'>
                    { this.state.contacts[0] ? this.state.contacts.map((contact, index) => {
                        return <div className="contact-item" key={index} onClick={() => this.openModal({...contact, id: index})}>
                            {contact.name}<br/>
                            {contact.number}
                        </div>
                    }) : <></>
                    }
                </div>     
            </section>
            
        )
    }
}

const mapStateToProps = (state: object) => {
    return state;
}

export default connect(mapStateToProps)(ContactPage)