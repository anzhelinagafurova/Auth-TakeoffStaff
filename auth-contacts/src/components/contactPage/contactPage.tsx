import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './modal/modal';
import Search from './search/search';

type Contact = {
    id?: number,
    name: string,
    number: string
}
type UserData = {
    login: string,
    password: string,
    id?: number
}
type DataState = {
    modalData: Contact,
    modalOpen: boolean,
}

class ContactPage extends Component {

    state: DataState = {
        modalData: {
            name: '',
            number: ''
        },
        modalOpen: false
    };

    props: {
        contactsInfo: Array<Contact>,
        filterValue: string,
        userInfo: UserData,
        setContacts: (data:Array<Contact>) => void
    }; 

    componentWillUnmount(): void {
        this.sendServerData();
    }

    sendServerData = (): void => {
        const { id, login, password } = this.props.userInfo;
        const body: object = {
            id, 
            login, 
            password,
            contacts: this.props.contactsInfo.map(el => {
                    return {
                        name: el.name,
                        number: el.number
                    }
                })
            
        }
        if (id !== undefined) {
            fetch(`http://localhost:3001/contactDeps/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            })
        } 
    }

    openModal = (data?: Contact): void => {
        this.setState({
            modalData: data,
            modalOpen: true
        })
    }

    deleteItem = (index: number): void => {
        this.props.setContacts([
            ...this.props.contactsInfo.slice(0, index),
            ...this.props.contactsInfo.slice(index + 1)
        ])
    }

    changeContact = (e: React.FormEvent<EventTarget>): void => {
        e.preventDefault();

        if (this.state.modalData.id !== undefined) {
            const target = e.target as HTMLInputElement;
            const name: string = target['contactName'].value;
            const number: string = target['telNum'].value;

            this.props.setContacts([
                ...this.props.contactsInfo.slice(0, this.state.modalData.id),
                {
                    id: this.state.modalData.id, name, number
                },
                ...this.props.contactsInfo.slice(this.state.modalData.id + 1),
            ])
        }
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
        this.props.setContacts([
            ...this.props.contactsInfo,
                {
                    name, number
                }
        ])

        this.closeModal();
    }

    renderFeatures(contact: Contact, index: number): JSX.Element {
        return (
            <div>
                <button type="button" className="btn btn-outline-primary right-margin" onClick={() => this.openModal({...contact, id: index})}>
                    <i className="fa fa-pen"></i>
                </button>
                
                <button type="button" key={index} className="btn btn-outline-danger" onClick={() => this.deleteItem(index)}>
                    <i className="fa fa-trash"></i>
                </button>
            </div>
        )
    }

    render(): JSX.Element {
        const { userInfo, contactsInfo, filterValue } = this.props;
        const contactsSourse = filterValue ? contactsInfo.filter(el => el.name.toLowerCase().includes(filterValue.toLowerCase())) : contactsInfo;
        return (
            <section>
                <div className='flexbox align-right base-padding margin-bottom-small'>
                    {userInfo.login}<br/>
                </div>
                <div className='flexbox align-between base-padding margin-bottom-big'>
                    <div></div>
                    <h1>Контакты</h1>
                    <button type="button" className="btn btn-outline-primary" onClick={() => this.openModal()}>
                        Добавить
                    </button>
                </div>

                <Search />

                { this.state.modalOpen ? 
                    <Modal 
                        addContact={this.addContact} 
                        closeModal={this.closeModal} 
                        modalData={this.state.modalData}
                        changeContact={this.changeContact}/> : <></>
                }

                <div className='base-padding'>
                    { 
                        contactsSourse.map((contact, index) => {
                            return <div className="flexbox align-between contact-item" key={index}>
                                {contact.name}<br/>
                                {contact.number}
                                {this.renderFeatures(contact, index)}
                            </div>  
                    })}
                </div>     
            </section>
        )
    }
}

const mapStateToProps = (state: object) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
      setContacts: (data: Array<Contact>) => {
        dispatch({ type: "SET_CONTACTS", payload: data })
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactPage)