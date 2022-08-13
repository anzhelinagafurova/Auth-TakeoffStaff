import React, { Component } from 'react';
import { connect } from 'react-redux';

type Contact = {
    id?: number,
    name?: string,
    number?: string
}
type UserData = {
    login: string,
    password: string,
    id?: number
}

class Search extends Component {
    props: {
        contactsInfo: Array<Contact>,
        filterValue: string,
        userInfo: UserData,
        setFilter: (data: string) => void
    }; 

    searchContact(e: React.FormEvent<EventTarget>): void {;
        const target = e.target as HTMLInputElement;
        const value: string = target.value;

        if (value) {
            this.props.setFilter(value);
        }
        else {
            this.props.setFilter('');
        }
    }

    render(): JSX.Element {
        return (
            <form className='base-padding margin-bottom-big'>
                <input type="text" name="search" className='search-field' placeholder='Поиск' onChange={(e) => this.searchContact(e)}></input>
            </form>
        )
    }
}
const mapStateToProps = (state: object) => {
    return state;
}
const mapDispatchToProps = (dispatch) => {
    return {
      setFilter: (data: Array<Contact>) => {
        dispatch({ type: "SET_FILTER", payload: data })
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)