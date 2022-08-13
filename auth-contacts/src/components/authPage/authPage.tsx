import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

type RedirectState = {
    redirect: boolean
}

type UserData = {
    login: string,
    password: string,
    id?: number
}

type Contact = {
    id?: number,
    name?: string,
    number?: string
}

class AuthPage extends Component {
    state: RedirectState = {
        redirect: false
    }

    props: {
        setUserInfo: (data: UserData) => void,
        setContacts: (data: Array<Contact>) => void
    }

    handleData = (data: UserData): void => {
        fetch('http://localhost:3001/contactDeps')
        .then(res => res.json())
        .then(res => res.find((el: UserData) => 
        {
            return el.login === data.login && el.password === data.password
        }))
        .then(filtered => {
            if (filtered) {
                this.props.setUserInfo({id: filtered.id, login: filtered.login, password: filtered.password})
                this.props.setContacts(filtered.contacts)

                this.redirect();
            }
            else {
                alert('Пользователь не зарегистрирован')
            }
        })
    }

    redirect = (): void => {
        this.setState({
            redirect: true
        })
    }

    handleForm(e: React.FormEvent<EventTarget>): void {
        e.preventDefault(); 
        const target = e.target as HTMLInputElement;
        const login: string = target['login'].value;
        const password: string = target['password'].value;

        this.handleData({login, password});
    }

    render(): JSX.Element {
        return ( this.state.redirect ? <Navigate to='/contacts'/> :
            <section className='flexbox align-center auth-contain'>
                <form onSubmit={(e) => this.handleForm(e)}>
                    <h1>Aвторизация</h1>
                    <div className='margin-bottom-small'>
                        <input type="text" name="login" placeholder='Логин' required></input>
                        <input type="password" name="password" placeholder='Пароль' required></input>
                    </div>
                    <div className='flexbox align-center'>
                        <button type="submit" className="btn btn-primary">Войти</button>
                    </div>
                </form>
            </section>
        )
    }
}

const mapStateToProps = (state: object) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
      setUserInfo: (data: object) => {
        dispatch({ type: "SET_INFO", payload: data })
      },
      setContacts: (data: object) => {
        dispatch({ type: "SET_CONTACTS", payload: data })
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)