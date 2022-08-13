import React, { Component } from 'react';

type Contact = {
    id?: number,
    name: string,
    number: string
}

export default class Modal extends Component {
    props: {
        addContact: (e: React.FormEvent<EventTarget>) => void,
        changeContact:(e: React.FormEvent<EventTarget>) => void,
        closeModal: () => void,
        modalData: Contact
    }

    render() {
        return (
                <div className="flexbox align-center absolute">
                    <form className="flexbox align-center form-contain" onSubmit={(e) => {
                            this.props.modalData ? this.props.changeContact(e) : this.props.addContact(e)
                        }}>
                        <div>
                            <h5 className="margin-bottom-big">{this.props.modalData ? 'Изменение' : 'Добавление'} контакта</h5>
                            <div className="flexbox align-around margin-bottom-small">
                                <input type="text" name="contactName" placeholder='Имя' defaultValue={this.props.modalData?.name} className='right-margin' required></input>
                                <input type="tel" name="telNum" placeholder='Номер телефона' defaultValue={this.props.modalData?.number} required></input>
                            </div>
                            <div className="flexbox align-around">
                                <button type="submit" className="btn btn-primary">Готово</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" 
                                    onClick={() => this.props.closeModal()}>Отменить</button>
                            </div>
                        </div>
                    </form>
                </div>
                )
    }
}