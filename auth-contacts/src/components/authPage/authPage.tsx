import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

type RedirectState = {
    redirect: boolean
}

class AuthPage extends Component {

    state: RedirectState = {
        redirect: false
    }

    props: any // поправить

    handleForm(e: React.FormEvent<EventTarget>): void {
        e.preventDefault(); 
        const target = e.target as HTMLInputElement;
        const login: string = target['login'].value;
        const password: string = target['password'].value;
        const userInfo: object = {
            login,
            password
        };

        this.props.setUserInfo(userInfo);
        this.setState({
            redirect: true
        })
    }

    render(): JSX.Element {
        return ( this.state.redirect ? <Navigate to='/contacts'/> :
            <section>
                <h1>Aвторизация</h1>
                <form onSubmit={(e) => this.handleForm(e)}>
                    <input type="text" name="login" placeholder='Логин' required></input>
                    <input type="password" name="password" placeholder='Пароль' required></input>
                    <button type="submit"><i className="fas fa-play"></i></button>
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
      }
    }
    
  }

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)