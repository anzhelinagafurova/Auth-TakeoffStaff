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

type State = {
    userInfo: UserData,
    contactsInfo: Array<Contact>,
    filterValue: string
}

type Action<TPayload> = {
    type: string;
    payload: TPayload;
}

const initialState: State = {
    userInfo: {
        login: '',
        password: ''
    },
    contactsInfo: [],
    filterValue: ''
}

const reducer = (state: State = initialState, action: Action<any>) => {
    switch (action.type) {
        case "SET_INFO": {
            return {
                ...state,
                userInfo: action.payload
            }
        }
        case "SET_CONTACTS": {
            return {
                ...state,
                contactsInfo: action.payload
            }
        }
        case "SET_FILTER": {
            return {
                ...state,
                filterValue: action.payload
            }
        }

        default:
            return state;
    }
}

export default reducer;