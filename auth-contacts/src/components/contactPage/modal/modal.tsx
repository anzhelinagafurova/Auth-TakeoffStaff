import React, { Component } from 'react';


export default class Modal extends Component {

    props: any; // поправить

    render() {
        return (
            <>
                <div className="modal">
                <form className="modal-dialog" onSubmit={(e) => {
                        this.props.modalData ? this.props.changeContact(e) : this.props.addContact(e)
                    }}>
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Добавление контакта</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type="text" name="contactName" placeholder='Имя' defaultValue={this.props.modalData?.name} required></input>
                        <input type="tel" name="telNum" placeholder='Номер телефона' defaultValue={this.props.modalData?.number} required></input>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" 
                            onClick={() => this.props.closeModal()}>Отменить</button>

                        <button type="submit" className="btn btn-primary">{this.props.modalData ? 'Изменить' : 'Добавить'}</button>
                    </div>
                    </div>
                </form>
                </div>
            </>
            
        )
    }
}